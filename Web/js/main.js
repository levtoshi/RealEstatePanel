import { Modal } from "./modal.js";

const realEstates = [];

function addEstate(formData)
{
    realEstates.push(formData);
    console.log(realEstates);
}

function app()
{
    const modal = new Modal();
    modal.onSubmit = addEstate;

    const btnCreate = document.getElementById("create-estate_button");

    btnCreate.addEventListener("click", () =>
    {
        modal.open();
    })
}

document.addEventListener("DOMContentLoaded", app);