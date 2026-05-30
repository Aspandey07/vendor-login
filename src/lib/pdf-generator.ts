import { jsPDF } from "jspdf"
import { toPng } from "html-to-image"

export const generatePDF = async (elementId: string, filename: string = "quote.pdf") => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.error(`Element with id ${elementId} not found`)
    return
  }

  try {
    const dataUrl = await toPng(element, { quality: 0.95, pixelRatio: 2 })
    
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })
    
    const imgProps = pdf.getImageProperties(dataUrl)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    
    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(filename)
  } catch (error) {
    console.error("Error generating PDF:", error)
  }
}
