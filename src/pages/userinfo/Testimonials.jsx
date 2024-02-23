import React from "react";

const Testimonials = ({
  testimonials,
  handleChange,
  addTestimonial,
  removeTestimonial,
}) => {
  const labelStyle = "flex gap-4 my-1";
  const labelTextStyle = "my-1 w-40";
  const inputStyle = "h-10 rounded-lg p-1";

  return (
    <div>
      <label className={labelStyle}>
        <span className={labelTextStyle}></span> Testimonials:
      </label>
      {testimonials?.map((testimonial, index) => (
        <div key={index} className="mb-4">
          <input
            className={inputStyle}
            type="text"
            name={`testimonials[${index}].review`}
            value={testimonial?.review}
            placeholder="Review"
            onChange={(e) => handleChange(index, "review", e.target.value)}
          />
          <input
            className={inputStyle}
            type="text"
            name={`testimonials[${index}].author`}
            value={testimonial?.author}
            placeholder="Author"
            onChange={(e) => handleChange(index, "author", e.target.value)}
          />

          <input
            className={inputStyle}
            type="text"
            name={`testimonials[${index}].company`}
            value={testimonial?.company}
            placeholder="Company"
            onChange={(e) => handleChange(index, "company", e.target.value)}
          />
          <button
            className="rounded-lg bg-button p-2 px-4 font-semibold text-white"
            type="button"
            onClick={() => removeTestimonial(index)}
          >
            Remove Testimonial
          </button>
        </div>
      ))}
      <button
        className="rounded-lg bg-button p-2 px-4 font-semibold text-white"
        type="button"
        onClick={addTestimonial}
      >
        Add Testimonial
      </button>
    </div>
  );
};

export default Testimonials;
