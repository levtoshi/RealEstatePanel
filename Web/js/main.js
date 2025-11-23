// Imports

// Modals
import { modal } from "./modals/modal.js";
import { deleteModal } from "./modals/deleteModal.js";

// Storages
import { estateStorage } from "./storages/storage.js";

// Controllers
import { cardsController } from "./controllers/cardsController.js";
import { filtersController } from "./controllers/filtersController.js";

// Data
import { estates } from "./data/estatesData.js";

// Add
function addEstate(formData)
{
    estateStorage.add(formData);
    filtersController.filter();
}

// Update
function updateEstate(id, updatedData)
{
    estateStorage.update(id, updatedData);
    filtersController.filter();
}

// Delete
function deleteEstate(id)
{
    estateStorage.delete(id);
    filtersController.filter();
}

// App
function app()
{
    // initLocalStorage();
    initCardsRendering();
    initModal();
    intiFiltering();
}

// Inits
function intiFiltering()
{
    filtersController.renderCallback = cardsController.renderElements.bind(cardsController);
    filtersController.getElementsCallback = estateStorage.getAll.bind(estateStorage);
    filtersController.filter();
}

function initCardsRendering()
{
    cardsController.editCallback = (id) =>
    {
        modal.onSubmit = updateEstate;
        modal.openForEdit(id, estateStorage.getById(id));
    };

    cardsController.deleteCallback = (id) =>
    {
        deleteModal.deletionId = id;
        deleteModal.open();
    };

    deleteModal.onDelete = deleteEstate;
}

function initLocalStorage()
{
    localStorage.clear();
    localStorage.setItem("estates", JSON.stringify(estates));
}

function initModal()
{
    const btnCreate = document.getElementById("create-estate-button");
    btnCreate.addEventListener("click", () =>
    {
        modal.onSubmit = addEstate;
        modal.open();
    });
}

// Start app
document.addEventListener("DOMContentLoaded", app);