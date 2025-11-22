// Imports
import { modal } from "./modal.js";
import { deleteModal } from "./deleteModal.js";
import { estateStorage } from "./storage.js";
import { cardsRendering } from "./cards.js";

// Add
function addEstate(formData)
{
    estateStorage.add(formData);
    cardsRendering.renderElements(estateStorage.getAll());
}

// Update
function updateEstate(id, updatedData)
{
    estateStorage.update(id, updatedData);
    cardsRendering.renderElements(estateStorage.getAll());
}

// Delete
function deleteEstate(id)
{
    estateStorage.delete(id);
    cardsRendering.renderElements(estateStorage.getAll());
}

// App
function app()
{
    initCardsRendering();
    initModal();
}

// Inits
function initCardsRendering()
{
    cardsRendering.renderElements(estateStorage.getAll());

    cardsRendering.editCallback = (id) =>
    {
        modal.onSubmit = updateEstate;
        modal.openForEdit(id, estateStorage.getById(id));
    };

    cardsRendering.deleteCallback = (id) =>
    {
        deleteModal.deletionId = id;
        deleteModal.open();
    };

    deleteModal.onDelete = deleteEstate;
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