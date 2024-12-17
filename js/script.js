


// Get the testimonial content element
const testimonialContent = document.getElementById('clickImgGroup');
const testimonialGroup = document.getElementById('testimonialGroup');
// Get the image group elements
const imgGroup = document.querySelectorAll('.imgGroup img');

// Add an event listener to each image
imgGroup.forEach((img, index) => {
  img.addEventListener('click', () => {
    // Change the testimonial content
    testimonialContent.innerHTML = `
      <h2>title ${index + 1}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel metus non lectus condimentum finibus.
        Donec
        vitae malesuada ex. Sed non ipsum et purus semper fermentum.</p>
    `;

    // Change the background color
    testimonialGroup.style.backgroundColor = getRandomColor();
  });
});

// Function to generate a random color
// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
function getRandomColor() {
  const colors = ['#D1E9F6', '#F1D3CE', '#EECAD5', '#F6EACB'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Add an event listener to each image
imgGroup.forEach((img) => {
  img.addEventListener('mouseover', () => {
    img.style.transform = 'scale(1.2)';
  });

  img.addEventListener('mouseout', () => {
    img.style.transform = 'scale(1)';
  });
});
