const Contact = () => (
  <div className="contact-us">
    <p>Contactează-ne</p>
    <p>
      Pentru întrebări sau informații suplimentare, ne poți contacta la:
      contact@macaronmagic.com
    </p>

    <form action="/send-data-here" method="post" className="contact-us-form">
      <p>Campurile marcate cu * sunt obligatorii</p>
      <label htmlFor="fullname">Nume complet*</label>
      <div className="contact-field">
        <input
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Numele tau complet"
          required
        />
        <span>*</span>
      </div>
      <label htmlFor="email">Adresa de e-mail:</label>
      <div className="contact-field">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Adresa de e-mail"
          required
        />
        <span>*</span>
      </div>
      <label htmlFor="enquiry">Mesajul tău:</label>
      <div className="contact-field">
        <textarea
          rows="5"
          cols="60"
          name="enquiry"
          placeholder="Scrie mesajul tău aici..."
        ></textarea>
      </div>
      <button type="submit" className="contact-submit">
        Trimite
      </button>
    </form>
  </div>
);

export default Contact;
