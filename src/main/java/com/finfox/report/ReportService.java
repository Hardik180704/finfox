package com.finfox.report;

import com.finfox.asset.Asset;
import com.finfox.asset.AssetService;
import com.finfox.transaction.Transaction;
import com.finfox.transaction.TransactionRepository;
import com.finfox.user.User;
import com.finfox.user.UserRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReportService {

    private final UserRepository userRepository;
    private final AssetService assetService;
    private final TransactionRepository transactionRepository;

    public ReportService(UserRepository userRepository, AssetService assetService, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.assetService = assetService;
        this.transactionRepository = transactionRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public byte[] generateFinancialHealthReport() {
        User user = getCurrentUser();
        List<Asset> assets = assetService.getAssetsForCurrentUser();
        List<Transaction> transactions = transactionRepository.findAllByUserId(user.getId());

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Title
            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontTitle.setSize(20);
            Paragraph title = new Paragraph("Financial Health Report", fontTitle);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            // User Info
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Name: " + user.getFirstName() + " " + user.getLastName()));
            document.add(new Paragraph("Email: " + user.getEmail()));
            document.add(new Paragraph("Date Generated: " + LocalDate.now().format(DateTimeFormatter.ofPattern("MMM dd, yyyy"))));
            document.add(new Paragraph(" "));

            // Portfolio Value
            document.add(new Paragraph("Portfolio Summary", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14)));
            document.add(new Paragraph("Total Value: $" + assetService.calculateTotalPortfolioValue().toString()));
            document.add(new Paragraph(" "));

            // Assets Table
            if (!assets.isEmpty()) {
                PdfPTable table = new PdfPTable(4);
                table.setWidthPercentage(100);
                
                table.addCell(getHeadCell("Asset Name"));
                table.addCell(getHeadCell("Symbol / Type"));
                table.addCell(getHeadCell("Quantity"));
                table.addCell(getHeadCell("Current Price"));

                for (Asset asset : assets) {
                    table.addCell(String.valueOf(asset.getName()));
                    table.addCell(asset.getSymbol() + " (" + asset.getType() + ")");
                    table.addCell(asset.getQuantity() != null ? asset.getQuantity().toString() : "0");
                    table.addCell("$" + (asset.getCurrentPrice() != null ? asset.getCurrentPrice().toString() : "0"));
                }
                document.add(table);
            } else {
                document.add(new Paragraph("No assets found in portfolio."));
            }

            document.add(new Paragraph(" "));

            // Transactions Summary
            document.add(new Paragraph("Transactions Summary", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14)));
            document.add(new Paragraph("Total Transactions Recorded: " + transactions.size()));
            
            BigDecimal totalExpenses = transactions.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()) && t.getAmount() != null)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            document.add(new Paragraph("Total Lifetime Expenses: $" + totalExpenses.toString()));

        } catch (DocumentException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }

        return out.toByteArray();
    }

    private PdfPCell getHeadCell(String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        return cell;
    }
}
