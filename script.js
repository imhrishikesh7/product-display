const titleLabel = document.getElementById('titleLabel');
const valueLabel = document.getElementById('valueLabel');
const productImage = document.getElementById('productImage');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const Val1 = document.getElementById('val1');
const Val2 = document.getElementById('val2');
const Val3 = document.getElementById('val3');
const Val4 = document.getElementById('val4');

const resolver = {
    resolve: function(options, callback) {
        const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
        const combinedOptions = Object.assign({}, options, { resolveString: resolveString });
        
        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function randomCharacter(characters) {
            return characters[getRandomInteger(0, characters.length - 1)];
        }
        
        function doRandomiserEffect(options, callback) {
            const characters = options.characters;
            const timeout = options.timeout;
            const element = options.element;
            const partialString = options.partialString;
            let iterations = options.iterations;
            
            setTimeout(() => {
                if (iterations >= 0) {
                    const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });
                    const $element = $('.glitch');
                    if (iterations === 0) {
                        element.textContent = partialString;
                        $element.attr('data-text', element.textContent);
                    } else {
                        element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                        $element.attr('data-text', element.textContent);
                    }
                    doRandomiserEffect(nextOptions, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            }, options.timeout);
        }
        
        function doResolverEffect(options, callback) {
            const resolveString = options.resolveString;
            const characters = options.characters;
            const offset = options.offset;
            const partialString = resolveString.substring(0, offset);
            const combinedOptions = Object.assign({}, options, { partialString: partialString });
            
            doRandomiserEffect(combinedOptions, () => {
                const nextOptions = Object.assign({}, options, { offset: offset + 1 });
                if (offset <= resolveString.length) {
                    doResolverEffect(nextOptions, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            });
        }
        
        doResolverEffect(combinedOptions, callback);
    }
};

const data = [
    {
        title: 'SUPERPOWER 90',
        imageUrl: 'prod1.png',
        value: ['1.20 ± 0.05','118%100','166%','3.5 Km/Sec']
    },
    {
        title: 'Rockets',
        imageUrl: 'prod3.png',
        value: ['NA','NA','NA','NA']
    }
];

let currentIndex = 0;

// Function to update title, image, and value for the next data set
function updateTitleAndImage(resolveString) {
    // Update title
    titleLabel.textContent = data[currentIndex].title;

    // Update product image
    productImage.src = data[currentIndex].imageUrl;

    // Update values
    Val1.textContent = data[currentIndex].value[0];
    Val2.textContent = data[currentIndex].value[1];
    Val3.textContent = data[currentIndex].value[2];
    Val4.textContent = data[currentIndex].value[3];

    // Call resolver with the next resolveString
    resolver.resolve({
        ...options,
        resolveString: resolveString
    }, () => {});
}

// Initially update title, image, and value with resolving text effect
const options = {
    offset: 0,
    timeout: 10,
    iterations: 10,
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
    resolveString: data[currentIndex].title,
    element: titleLabel
};

resolver.resolve(options, () => {
    // Start updating title, image, and value after the resolving effect completes
    updateTitleAndImage(data[currentIndex].title);
});

// Event listener for the next button
nextButton.addEventListener('click', () => {
    // Update title, image, and value for the next data set
    currentIndex = (currentIndex + 1) % data.length;
    updateTitleAndImage(data[currentIndex].title);
});

// Event listener for the previous button
prevButton.addEventListener('click', () => {
    // Update title, image, and value for the previous data set
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    updateTitleAndImage(data[currentIndex].title);
});
