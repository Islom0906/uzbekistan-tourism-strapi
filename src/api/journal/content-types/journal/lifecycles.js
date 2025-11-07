// const path = require("path");
// const fs = require("fs");
// const {fromPath} = require("pdf2pic");
// const { Readable } = require('stream');
//
// function bufferToStream(buffer) {
//     const stream = new Readable();
//     stream.push(buffer);
//     stream.push(null);
//     return stream;
// }
//
// module.exports = {
//     async afterCreate(event) {
//         await convertPdfToImages(event);
//     },
//     async afterUpdate(event) {
//         await convertPdfToImages(event);
//     },
// };
//
// async function convertPdfToImages(event) {
//     const {result} = event;
//
//     try {
//         const defaultLocale = strapi.config.get("plugin::i18n.defaultLocale", "en");
//         if (result.locale && result.locale !== defaultLocale) {
//             strapi.log.info(`🌍 Skipping PDF conversion for locale: ${result.locale}`);
//             return;
//         }
//
//         const pdfField = result.pdf_en;
//         const pdfUrl = pdfField?.url || pdfField?.data?.attributes?.url;
//         if (!pdfUrl) {
//             strapi.log.error("❌ PDF URL not found in result.pdf_en");
//             return;
//         }
//
//         const pdfPath = path.join(strapi.dirs.static.public, pdfUrl);
//         if (!fs.existsSync(pdfPath)) {
//             strapi.log.error("❌ PDF file not found:", pdfPath);
//             return;
//         }
//
//         const pdfName = path.basename(pdfUrl, ".pdf");
//         strapi.log.info(`📄 Converting PDF (${pdfName}.pdf) to images (in-memory)...`);
//
//         const pages =await fromPath(pdfPath, {
//             density: 150,
//             format: "png",
//             width: 1240,
//             height: 1754,
//             quality: 90,
//             saveFilename: null,
//             savePath: undefined,
//         })
//             .bulk(-1, { responseType: "buffer" });
//
//         // const pages = await converter; // second arg true => buffer qaytaradi
//         console.log(pages)
//         // if (!pages?.length) {
//         //     strapi.log.error("❌ No pages were generated from the PDF.");
//         //     return;
//         // }
//
//         const uploadService = strapi.service("plugin::upload.upload");
//
//         const uploadedImages = [];
//
//         strapi.log.info(`🧩 Uploading ${pages.length} generated images...`);
//
//         for (let i = 0; i < pages.length; i++) {
//             const page = pages[i];
//             try {
//
//
//
//                 const stream = bufferToStream(page.buffer);
//                 const fileName = `${pdfName}_page_${i + 1}.jpg`;
//                 const buffer = page.buffer
//                 const uploaded = await strapi.service("plugin::upload.upload").upload({
//
//                     files: buffer
//                 });
//
//                 const first = Array.isArray(uploaded) ? uploaded[0] : uploaded;
//                 if (first?.id) {
//                     strapi.log.info(`✅ Uploaded page ${i + 1}: ${first.url}`);
//                     uploadedImages.push(first);
//                 } else {
//                     strapi.log.warn(`⚠️ Unexpected upload response for page ${i + 1}`);
//                 }
//             } catch (err) {
//                 strapi.log.error(`❌ Failed to upload page ${i + 1}: ${err.message}`);
//             }
//         }
//
//         if (!uploadedImages.length) {
//             strapi.log.error("❌ No images were uploaded successfully.");
//             return;
//         }
//
//         // update journal entry
//         await strapi.entityService.update("api::journal.journal", result.id, {
//             data: {images: uploadedImages.map((img) => img.id)},
//         });
//
//         strapi.log.info(`✅ PDF converted successfully (${uploadedImages.length} pages).`);
//     } catch (err) {
//         strapi.log.error("❌ PDF conversion failed:", err);
//     }
// }
