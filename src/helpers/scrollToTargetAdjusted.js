export function scrollToTargetAdjusted(target, offset = '100'){
    let elementPosition = target.getBoundingClientRect().top;
    let offsetPosition = elementPosition + window.pageYOffset - offset;
  
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}