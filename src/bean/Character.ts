export class Character {

    private id: Number;
    private name: String;
    private description: String;


    /**
     * Getter $id
     * @return {Number}
     */
	public get $id(): Number {
		return this.id;
	}

    /**
     * Getter $name
     * @return {String}
     */
	public get $name(): String {
		return this.name;
	}

    /**
     * Getter $description
     * @return {String}
     */
	public get $description(): String {
		return this.description;
	}

    /**
     * Setter $id
     * @param {Number} value
     */
	public set $id(value: Number) {
		this.id = value;
	}

    /**
     * Setter $name
     * @param {String} value
     */
	public set $name(value: String) {
		this.name = value;
	}

    /**
     * Setter $description
     * @param {String} value
     */
	public set $description(value: String) {
		this.description = value;
	}

    public assign(value: any) {
		this.id = value.id;
        this.name = value.name;
        this.description = value.description;
        return this;
	}

}