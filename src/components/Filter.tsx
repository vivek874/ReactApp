import { useState, FormEvent, ChangeEvent } from "react";

interface FormField {
  name: string;
  label: string;
  type?: string;
  options?: string[];
}

interface FormProp {
  fields: FormField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: Record<string, any>) => void;
}
const Filter = ({ fields, initialValues, onSubmit }: FormProp) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Apply Filter</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="form-label">
                    {field.label}
                  </label>

                  <div className="mb-3">
                    {field.type === "select" ? (
                      <select
                        className="form-control"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="form-control"
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        
                      />
                    )}
                  </div>
                </div>
              ))}
              <button type="submit" className="btn btn-primary w-100">
                Go
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Filter;
