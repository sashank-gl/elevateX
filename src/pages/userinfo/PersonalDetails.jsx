const PersonalDetails = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");

    if (child) {
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const labelStyle = `flex gap-4 my-1`;
  const labelTextStyle = `my-1 w-40`;
  const inputStyle = `h-10 rounded-lg p-1`;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <label className={labelStyle}>
          <span className={labelTextStyle}>First Name:</span>
          <input
            className={inputStyle}
            type="text"
            name="firstName"
            value={formData?.firstName}
            onChange={handleChange}
          />
        </label>
        <label className={labelStyle}>
          <span className={labelTextStyle}>Last Name:</span>
          <input
            className={inputStyle}
            type="text"
            name="lastName"
            value={formData?.lastName}
            onChange={handleChange}
          />
        </label>
        <label className={labelStyle}>
          <span className={labelTextStyle}>Email:</span>
          <input
            className={inputStyle}
            type="email"
            name="contacts.email"
            value={formData?.contacts?.email}
            onChange={handleChange}
          />
        </label>

        <label className={labelStyle}>
          <span className={labelTextStyle}>Phone Number:</span>
          <input
            className={inputStyle}
            type="tel"
            name="contacts.phoneNumber"
            value={formData?.contacts?.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <label className={labelStyle}>
          <span className={labelTextStyle}>Location:</span>
          <input
            className={inputStyle}
            type="text"
            name="location"
            value={formData?.location}
            onChange={handleChange}
          />
        </label>

        <label className={labelStyle}>
          <span className={labelTextStyle}>WhatsApp:</span>
          <input
            className={inputStyle}
            type="tel"
            name="contacts.whatsApp"
            value={formData?.contacts?.whatsApp}
            onChange={handleChange}
          />
        </label>

        <label className={labelStyle}>
          <span className={labelTextStyle}>LinkedIn:</span>
          <input
            className={inputStyle}
            type="text"
            name="contacts.linkedIn"
            value={formData?.contacts?.linkedIn}
            onChange={handleChange}
          />
        </label>

        <label className={labelStyle}>
          <span className={labelTextStyle}>Twitter:</span>
          <input
            className={inputStyle}
            type="text"
            name="contacts.twitter"
            value={formData?.contacts?.twitter}
            onChange={handleChange}
          />
        </label>

        <label className={labelStyle}>
          <span className={labelTextStyle}>GitHub:</span>
          <input
            className={inputStyle}
            type="text"
            name="contacts.gitHub"
            value={formData?.contacts?.gitHub}
            onChange={handleChange}
          />
        </label>

        <label className={labelStyle}>
          <span className={labelTextStyle}>Facebook:</span>
          <input
            className={inputStyle}
            type="text"
            name="contacts.facebook"
            value={formData?.contacts?.facebook}
            onChange={handleChange}
          />
        </label>

        <label className={labelStyle}>
          <span className={labelTextStyle}>Instagram:</span>
          <input
            className={inputStyle}
            type="text"
            name="contacts.instagram"
            value={formData?.contacts?.instagram}
            onChange={handleChange}
          />
        </label>

        <label className={labelStyle}>
          <span className={labelTextStyle}>Stack Overflow:</span>
          <input
            className={inputStyle}
            type="text"
            name="contacts.stackoverflow"
            value={formData?.contacts?.stackoverflow}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default PersonalDetails;
