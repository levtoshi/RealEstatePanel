class CardsRendering
{
    constructor()
    {
        this.editCallback = null;
        this.deleteCallback = null;
    }

    // Rendering
    createElement(element)
    {
        // Main
        const productContainer = document.createElement("div");
        productContainer.classList.add("estate_container");

        // Area
        const areaContainer = document.createElement("div");
        areaContainer.classList.add("estate-area_container");

        const areaText = document.createElement("p");
        areaText.classList.add("estate-area_text");
        areaText.textContent = element.area;

        areaContainer.append(areaText);

        // Image
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("estate-image_container");

        const image = document.createElement("img");
        image.classList.add("estate_image");
        image.src = element.photo;

        imageContainer.append(image);

        // Category
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category_container");

        const categoryText = document.createElement("p");
        categoryText.classList.add("category_text");
        categoryText.textContent = element.category;

        categoryContainer.append(categoryText);

        // Title
        const title = document.createElement("p");
        title.classList.add("estate_title");
        title.textContent = element.name;

        // Location
        const location = document.createElement("p");
        location.classList.add("estate_location");
        location.textContent = element.location;

        // Price and Icons
        const priceFlex = document.createElement("div");
        priceFlex.classList.add("price-cart_flex");

        // Price
        const estatePrice = document.createElement("p");
        estatePrice.classList.add("estate-price_text");
        estatePrice.textContent = element.price;

        // Icons
        const iconsFlex = document.createElement("div");
        iconsFlex.classList.add("icons_flex");

        const editIcon = document.createElement("p");
        editIcon.classList.add("fa-regular", "fa-pen-to-square");
        editIcon.addEventListener("click", () => this.editCallback(element.id));

        const deleteIcon = document.createElement("p");
        deleteIcon.classList.add("fa-solid", "fa-trash");
        deleteIcon.addEventListener("click", () => this.deleteCallback(element.id));

        iconsFlex.append(editIcon, deleteIcon);
        priceFlex.append(estatePrice, iconsFlex);

        // Append
        productContainer.append(areaContainer, imageContainer, categoryContainer, title, location, priceFlex);

        return productContainer;
    }

    renderElements(arr)
    {
        const productContainer = document.querySelector(".estates_container");
        productContainer.innerHTML = "";

        arr.forEach((element) => {
            const card = this.createElement(element);
            productContainer.append(card);
        });
    }
}

export const cardsRendering = new CardsRendering();