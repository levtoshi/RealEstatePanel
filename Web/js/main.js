// Imports

// Modals
import { modal } from "./modals/modal.js";
import { deleteModal } from "./modals/deleteModal.js";

// Storages
import { estateStorage } from "./storages/estateStorage.js";

// Controllers
import { paginationController } from "./controllers/paginationController.js";
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
    //initLocalStorage();
    initPagination();
    initCardsRendering();
    initModal();
    initFiltering();
}

// Inits
function initPagination()
{
    paginationController.renderCardsCallback = cardsController.renderElements.bind(cardsController);
}

function initFiltering()
{
    filtersController.renderCallback = cardsController.renderElements.bind(cardsController);
    filtersController.getElementsCallback = estateStorage.getAll.bind(estateStorage);
    filtersController.setRenderArrayCallback = cardsController.setRenderArray.bind(cardsController);
    filtersController.paginationCallback = paginationController.updateLastPage.bind(paginationController);

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

    cardsController.getPaginationPageCallback = paginationController.getPaginationPage.bind(paginationController);
    cardsController.getPageElementAmountCallback = paginationController.getPageElementAmount.bind(paginationController);
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