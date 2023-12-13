const Filters = () => {
    return (
        <form className="filter">
            <label className="filter__label" htmlFor="prov">Selecciona una provincia</label>
            <select className="filter__select" name="prov" id="prov">
                <option value="">A Coruña</option>
            </select>
        </form>
    );
};

export default Filters;