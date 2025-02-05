"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLight, setIsLight] = useState(true);

  const checkBackground = useCallback(() => {
    const footer = document.querySelector("footer");
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const buttonRect = document
        .getElementById("back-to-top")
        ?.getBoundingClientRect();

      if (buttonRect && footerRect.top <= buttonRect.bottom) {
        setIsLight(true);
      } else {
        setIsLight(false);
      }
    }
  }, []);

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    checkBackground();
  }, [checkBackground]);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      id="back-to-top"
      className={`fixed bottom-12 md:bottom-6 right-6 p-2 rounded-full shadow-lg transition-all duration-300 z-50 backdrop-blur-sm
        ${
          isLight
            ? "bg-white/70 text-[#1b3a2d] hover:bg-white"
            : "bg-[#1b3a2d]/70 text-white hover:bg-[#1b3a2d]"
        }
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b3a2d]`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ChevronUp className="h-6 w-6" />
      <span className="sr-only">Back to top</span>
    </button>
  );
}

// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { ChevronUp } from 'lucide-react'

// export default function BackToTop() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [isLight, setIsLight] = useState(true)

//   const checkBackground = useCallback(() => {
//     const footer = document.querySelector('footer')
//     if (footer) {
//       const footerRect = footer.getBoundingClientRect()
//       const buttonRect = document
//         .getElementById('back-to-top')
//         ?.getBoundingClientRect()

//       if (buttonRect && footerRect.top <= buttonRect.bottom) {
//         setIsLight(true)
//       } else {
//         setIsLight(false)
//       }
//     }
//   }, [])

//   const toggleVisibility = useCallback(() => {
//     if (window.pageYOffset > 300) {
//       setIsVisible(true)
//     } else {
//       setIsVisible(false)
//     }
//     checkBackground()
//   }, [checkBackground])

//   useEffect(() => {
//     window.addEventListener('scroll', toggleVisibility)
//     return () => window.removeEventListener('scroll', toggleVisibility)
//   }, [toggleVisibility])

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     })
//   }

//   if (!isVisible) {
//     return null
//   }

//   return (
//     <button
//       id="back-to-top"
//       className={`fixed bottom-4 right-4 p-3 md:bottom-6 md:right-6 rounded-full shadow-lg transition-all duration-300 z-50 backdrop-blur-sm
//         ${
//           isLight
//             ? 'bg-white/70 text-[#1b3a2d] hover:bg-white'
//             : 'bg-[#1b3a2d]/70 text-white hover:bg-[#1b3a2d]'
//         }
//         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b3a2d]`}
//       onClick={scrollToTop}
//       aria-label="Back to top"
//     >
//       <ChevronUp className="h-5 w-5 md:h-6 md:w-6" />
//       <span className="sr-only">Back to top</span>
//     </button>
//   )
// }
