const imageContainer = document.querySelector('.image_data');


// NASA API

const page = 1;
// const camera = 'fhaz'
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${apiKey}`;


let resultsArray = [];



// // create DOM Nodes
const createDOMNodes = () => {
  window.scrollTo({top:0, behavior:'instant'})
  resultsArray.forEach(result => {
    

    // card container

    const card = document.createElement('div');
    

    //add a class
    card.classList.add('card');

    // link
    const link = document.createElement('a');
    // link.classList.add('image')
    link.href = result.img_src;
    link.title = 'View Full Image';
    link.target = '_blank';
    

    // imageCard 

    const imagaResult = document.createElement('div');
    imagaResult.classList.add('image_result')
    //image
    const image = document.createElement('img');
    image.src = result.img_src;

    image.loading = 'lazy';
    image.classList.add('card_image');


    //camera data
    const cameraData = document.createElement('div');
    cameraData.classList.add('camera_data')
    const cameraName = document.createElement('h2');
    const cameraValue = document.createElement('h3');
    cameraName.textContent = 'Camera Name :'
    cameraValue.textContent = result.camera.full_name;
    
    const capturedDate = document.createElement('div');
    capturedDate.classList.add('photo_date');

    const capturedDateTitle = document.createElement('h2');
    const capturedValue = document.createElement('h3');
    capturedDateTitle.textContent = 'Photo Was taken on :';
    capturedValue.textContent = result.earth_date;

  // rover data
    
    const roverData = document.createElement('div');
    roverData.className = 'rover_data';

    const roverTitle = document.createElement('h2');
    roverTitle.textContent = 'Rover Name'
    const roverTitleValue = document.createElement('p');
    roverTitleValue.textContent = result.rover.name;

    const landingDataTitle = document.createElement('h2');
    landingDataTitle.textContent = 'Landing Date';
 
    const landingDate = document.createElement('p');
    landingDate.textContent = result.rover.landing_date;

    const launchDateTitle = document.createElement('h2');
    launchDateTitle.textContent = 'Launch Date';

    const launchDate = document.createElement('p');
    launchDate.textContent = result.rover.launch_date;


    const statusTitle = document.createElement('h2');
    statusTitle.textContent = 'Status';
    const status = document.createElement('p');
    status.textContent = result.rover.status;


  

      // append
    
    roverData.append(roverTitle, roverTitleValue,landingDataTitle,  landingDate,launchDateTitle, launchDate,statusTitle, status);

    cameraData.append(cameraName, cameraValue);
    capturedDate.append(capturedDateTitle, capturedValue);

    link.appendChild(image)
    imagaResult.appendChild(link)

    card.append(imagaResult, cameraData,capturedDate, roverData);

    imageContainer.appendChild(card);

  })
}

// update DOM

const updateDOM = () => {
   createDOMNodes();

}


const getMarsRoverPictures = async ()=> {
  try {
    const response = await fetch(apiUrl);
    // console.log(response);
    const responseData = await response.json()
    // console.log(responseData);
    resultsArray =  await responseData.photos;
    // console.log(resultsArray);
    // resultsArray = await response.json();
    // (resultsArray.forEach((res) => {
    //   console.log(res.rover);
    // }));
    // updateDOM();
    updateDOM();

    
  } catch (error) {
    alert(error.message)
    
  }
}

getMarsRoverPictures()