import jsPDF from 'jspdf';
import { DesignToken, BrandInfo } from '@/types/tokens';

export function exportBrandGuidePdf(brand: BrandInfo, tokens: DesignToken[]) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Page 1: Cover Header
  doc.setFillColor(9, 10, 15); // Obsidian black background
  doc.rect(0, 0, 210, 297, 'F');

  // Cyan Accent Header Bar
  doc.setFillColor(0, 240, 255);
  doc.rect(15, 20, 180, 4, 'F');

  // Title
  doc.setTextColor(244, 246, 252);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text(brand.name.toUpperCase(), 15, 38);

  doc.setTextColor(0, 240, 255);
  doc.setFontSize(14);
  doc.text('BRAND IDENTITY & DESIGN SYSTEM SPECIFICATION', 15, 48);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(10);
  doc.text(`Version ${brand.version} | Generated ${new Date().toLocaleDateString()}`, 15, 56);
  doc.text(brand.tagline, 15, 62);

  // Divider
  doc.setDrawColor(34, 40, 56);
  doc.line(15, 68, 195, 68);

  // Section 1: Brand Fundamentals
  doc.setTextColor(244, 246, 252);
  doc.setFontSize(16);
  doc.text('1. Brand Typography & Color Core', 15, 78);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`Display Headline Font: ${brand.fontHeadline}`, 15, 86);
  doc.text(`Body Interface Font: ${brand.fontBody}`, 15, 92);
  doc.text(`Monospace Token Font: ${brand.fontMono}`, 15, 98);

  // Color Swatches Grid
  doc.setTextColor(244, 246, 252);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Core Color Palette', 15, 112);

  const colorTokens = tokens.filter((t) => t.category === 'colors' && t.value.startsWith('#'));
  let startY = 120;
  let startX = 15;
  let col = 0;

  colorTokens.slice(0, 12).forEach((token, index) => {
    // Hex RGB conversion
    const hex = token.value.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;

    // Draw swatch box
    doc.setFillColor(r, g, b);
    doc.roundedRect(startX, startY, 40, 20, 2, 2, 'F');
    doc.setDrawColor(255, 255, 255);
    doc.roundedRect(startX, startY, 40, 20, 2, 2, 'S');

    // Label under swatch
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(244, 246, 252);
    doc.text(token.name, startX, startY + 25);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 240, 255);
    doc.text(`${token.value} | ${token.cssVariable}`, startX, startY + 29);

    col++;
    if (col >= 4) {
      col = 0;
      startX = 15;
      startY += 36;
    } else {
      startX += 45;
    }
  });

  // Section 3: Component Inventory Summary
  startY = Math.max(startY + 40, 220);
  doc.setTextColor(244, 246, 252);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Component & Token Summary', 15, startY);

  const categories = Array.from(new Set(tokens.map((t) => t.category)));
  let catY = startY + 8;
  categories.forEach((cat) => {
    const count = tokens.filter((t) => t.category === cat).length;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`• ${cat.toUpperCase()}: ${count} verified token(s)`, 20, catY);
    catY += 5.5;
  });

  // Footer page 1
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('ANICHISOM Design System Engine © 2026. All rights reserved.', 15, 287);

  doc.save(`${brand.name.toLowerCase()}-brand-guide-v${brand.version}.pdf`);
}
