class EstateStorage {
    constructor() {
        this.estates = JSON.parse(localStorage.getItem("estates")) || [];
    }

    // CRUD Operations
    add(estate) {
        const newEstate = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...estate
        }

        this.estates.push(newEstate);
        this.setItemToLS();
        return newEstate;
    }

    update(id, updatedData){
        const index = this.estates.findIndex(estate => estate.id === id);
        if (index !== -1) {
            this.estates[index] = {
                ...this.estates[index],
                ...updatedData,
                updatedAt: new Date().toISOString()
            }
            this.setItemToLS();
            return this.estates[index];
        }
        return null;
    }

    delete(id)
    {
        const index = this.estates.findIndex(estate => estate.id === id);
        if (index !== -1) {
            this.estates.splice(index, 1);
            this.setItemToLS();
            return true;
        }
        return false;
    }
        
    
    getAll() {
        return this.estates;
    }

    getById(id) {
        return this.estates.find(estate => estate.id === id)
    }

    // Work with LocalStorage
    setItemToLS()
    {
        try
        {
            localStorage.setItem("estates", JSON.stringify(this.estates));
        }
        catch(error)
        {
            console.log(error);
        }
    }
}

export const estateStorage = new EstateStorage();