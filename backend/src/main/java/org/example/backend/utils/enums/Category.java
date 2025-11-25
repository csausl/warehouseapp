package org.example.backend.utils.enums;

public enum Category {
    ELECTRONICS ("Elektronik"),
    SPORT_EQUIPMENT ("Sportartikel"),
    COSMETICS ("Kosmetik"),
    CLOTHING ("Kleidung");

    private final String category;

    Category(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}
