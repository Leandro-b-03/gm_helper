export const printSection = (html: HTMLElement, options: any = {}) => {
  console.log('printSection', html, options);
  if (html) {
    var html_ = html.cloneNode(true) as HTMLElement;
    const popupWindow = window.open('', '_blank');

    html_.classList.remove('lg:w-[900px]');
    html_.classList.add('lg:w-[550px]');

    if (popupWindow) {
      popupWindow.document.open();
      popupWindow.document.write(`
        <html>
          <head>
            <title>PDF Preview</title>
            <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>
            <style>
              @page {
                size: A4 landscape;
                margin: 0; /* Important for full-page use */
              }

              @media print {
                .page {
                  width: auto;  /* Use full available width */
                  height: auto; /* Use full available height */
                  box-shadow: none; /* Remove shadows for print */
                  /* Any other print-only overrides */
                }
                .no-print {
                    display: none !important;
                }
              }

              /* General Styling (Adjust as needed, but be mindful of print) */
              body {
                font-family: sans-serif; /* Use a web-safe font */
                -webkit-print-color-adjust: exact; /* Important for accurate colors */
                print-color-adjust: exact;         /* Standard property (for future-proofing) */
                margin: 0;
                padding: 0;
              }

              .page {
                  width: 297mm;  /* Half A4 width */
                  height: 210mm; /* Half A4 height*/
                  box-sizing: border-box; /* Include padding/border in width/height */
                  margin: 0 auto; /* Center the page */
                  display: flex;
                  flex-direction: row; /* Landscape orientation */
                  padding: 0mm; /* Add some margin around the content */
                  background-color: white; /* Ensure white background for printing */
              }
              .column {
                  width: 50%;
                  height: 100%;
                  box-sizing: border-box;
                  margin-top: 10px;
                  margin-left: 10px;
              }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="column">
                ${html_.outerHTML.replace(/text-xs/g, 'text-[7px]').replace(/<h2 class="font-semibold">/g, '<h2 class="font-semibold text-[10px]">').replace(/<th colspan="2" class="bg-gray-200 p-1 text-center rounded-t">/g, '<th colspan="2" class="bg-gray-200 p-1 text-center rounded-t text-[10px]">')}
              </div>
            </div>
          </body>
        </html>
      `);
      popupWindow.document.close();
    } else {
      console.error('Failed to open popup window.');
    }
  } else {
    console.error('pdfSection is not available.');
  }
};