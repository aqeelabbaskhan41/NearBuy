// // src/components/InfoSection.jsx
// import React from "react";

// function InfoSection({ title, subtitle, imageSrc, altText }) {
//   return (
//     <div className="relative flex justify-center items-start min-h-screen pt-12 px-4">
//       {/* Image on left for md and above */}
//       <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-0 hidden md:block">
//         <img
//           src={imageSrc}
//           alt={altText}
//           width={420}
//           height={300}
//           className="object-contain"
//         />
//       </div>

//       <div className="z-10 w-full max-w-3xl text-center">
//         <h1 className="text-3xl sm:text-4xl font-bold mb-6 px-2 sm:px-0 leading-snug">
//           {title}
//         </h1>
//         <p className="text-base sm:text-lg px-4">{subtitle}</p>

//         {/* Mobile image below text */}
//         <div className="mt-8 block md:hidden">
//           <img
//             src={imageSrc}
//             alt={altText}
//             width={280}
//             height={200}
//             className="mx-auto object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InfoSection;
