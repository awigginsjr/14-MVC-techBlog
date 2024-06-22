// Description: Helper functions for the application.
// module.exports = {
//     // Function to get the current date
//     formatDate: function (date) {
//         return date.toLocaleDateString();
//     }
// };

module.exports = {
    formatDate: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
};

console.log("toLocaleDateString");
  