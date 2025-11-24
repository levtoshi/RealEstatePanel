class FiltersController
{
    constructor()
    {
        this.categoryFilter = document.getElementById("estateFilterCategory");
        this.searchFilter = document.getElementById("estateFilerName");
        this.otherFilters = document.getElementById("estateSort");
        
        this.renderCallback = null;
        this.getElementsCallback = null;
        this.paginationCallback = null;
        this.setRenderArrayCallback = null;
        this.filterArray = [];

        this.initEventListeners();
    }

    initEventListeners()
    {
        this.categoryFilter.addEventListener("change", () =>
        {
            this.filter();
        });
        this.searchFilter.addEventListener("input", () =>
        {
            this.filter();
        });
        this.otherFilters.addEventListener("change", () =>
        {
            this.filter();
        });
    }

    filter()
    {
        this.filterArray = (this.getElementsCallback) ? this.getElementsCallback() : [];
        
        this.filterByCategory();
        this.filterBySearch();
        this.filterByOther();

        if (this.filterArray)
        {
            this.paginationCallback(this.filterArray.length);

            this.setRenderArrayCallback(this.filterArray);
            this.renderCallback(this.filterArray);
        }
    }

    filterByCategory()
    {
        if (this.categoryFilter.value !== "All")
        {
            console.log(this.categoryFilter.value);
            this.filterArray = this.filterArray.filter(estate => estate.category === this.categoryFilter.value);
        }
    }

    filterBySearch()
    {
        if (this.searchFilter.value.trim() !== "")
        {
            this.filterArray = this.filterArray.filter(estate =>
                estate.name.toLowerCase().includes(this.searchFilter.value.toLowerCase()) ||
                estate.location.toLowerCase().includes(this.searchFilter.value.toLowerCase()));
        }
    }   

    filterByOther()
    {
        switch (this.otherFilters.value)
        {
            case "Increase":
                this.filterArray.sort((a, b) => (a.price - b.price));
                break;
            case "Decrease":
                this.filterArray.sort((a, b) => (b.price - a.price));
                break;
            case "Newest":
                this.filterArray.sort((a, b) => (Date.parse(b.createdAt || 0) - Date.parse(a.createdAt || 0)));
                break;
            case "Oldest":
                this.filterArray.sort((a, b) => (Date.parse(a.createdAt || 0) - Date.parse(b.createdAt || 0)));
                break;
            case "Default":
                this.filterArray.sort((a, b) => (Date.parse(a.createdAt || 0) - Date.parse(b.createdAt || 0)));
                break;
        }
    }

}

export const filtersController = new FiltersController();