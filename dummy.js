// // function that actually works
// $("#type-input").keydown(function (event) {
//   var lastInput = event.key;
//   console.log(lastInput);
//   // debugger;
//   if(lastInput === "Backspace" && $(this).val()){
//     // if there is an error
//     if (stoppedIndex < strIndex && stoppedIndex) {
//       // if there is an error
//       incoorectIndex -= 1;
//       strIndex -= 1;
//       textParagraph.html("<span class='highlight'>" + paragraphStr.substr(0, stoppedIndex) + "</span>" +
//         "<span class='highlight-wrong'>" + paragraphStr.substr(stoppedIndex, incoorectIndex) + "</span>" + paragraphStr.substr(stoppedIndex + incoorectIndex, paragraphStr.length));
//       if(stoppedIndex === strIndex) {
//         // if the error is fixed
//         stoppedIndex = 0;
//         incoorectIndex = 0;
//         textParagraph.html("<span class='highlight'>" + paragraphStr.substr(0, strIndex) + "</span>" + paragraphStr.substr(strIndex, paragraphStr.length));
//       }
//     } else {
//       // if there is no error and you're backspacing
//       strIndex -= 1;
//       textParagraph.html("<span class='highlight'>" + paragraphStr.substr(0, strIndex) + "</span>" + paragraphStr.substr(strIndex, paragraphStr.length));
//     }
//     console.log(`in backspace stoppedIndex is ${stoppedIndex}, incorrectIndex is ${incoorectIndex}, and strIndex is ${strIndex}`);
//   } else if (event.keyCode === 32 && lastInput === paragraphStr[strIndex] && stoppedIndex === 0) {
//     // same logic as continuously correct but need to specific spacebar because you want to clear the text field.
//     strIndex += 1;
//     textParagraph.html("<span class='highlight'>" + paragraphStr.substr(0, strIndex) + "</span>" + paragraphStr.substr(strIndex, paragraphStr.length));
//     $(this).val('');
//   } else if (lastInput.length === 1 && lastInput === paragraphStr[strIndex] && stoppedIndex === 0) {
//     // continuously correct.
//     strIndex += 1;
//     textParagraph.html("<span class='highlight'>" + paragraphStr.substr(0, strIndex) + "</span>" + paragraphStr.substr(strIndex, paragraphStr.length));
//     isWonGame();
//   } else if ((lastInput.length === 1 && lastInput !== paragraphStr[strIndex]) || stoppedIndex !== 0){
//     if(stoppedIndex === 0){
//       stoppedIndex = strIndex;
//     }
//     // incoorectIndex += 1;
//     strIndex += 1;
//     incoorectIndex = strIndex - stoppedIndex;
//     console.log(`stoppedIndex is ${stoppedIndex}, incorrectIndex is ${incoorectIndex}, and strIndex is ${strIndex}`);
//     textParagraph.html("<span class='highlight'>" + paragraphStr.substr(0, stoppedIndex) + "</span>" +
//       "<span class='highlight-wrong'>" + paragraphStr.substr(stoppedIndex, incoorectIndex) + "</span>" + paragraphStr.substr(stoppedIndex + incoorectIndex, paragraphStr.length));
//   } else {
//     console.log("false");
//   }
// });
//
//
// // textParagraph.html("<span class='highlight'>" + paragraphStr.slice(0, strIndex) + "</span>" +
// //   "<span class='highlight-wrong'>" + paragraphStr.slice(strIndex, stoppedIndex) + "</span>" +
// //   "<span class='highlight-none'>" + paragraphStr.slice(stoppedIndex, paragraphStr.length) + "</span>")