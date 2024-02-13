const Monochromatic = ({ photo, client }) => {
  return (
    <>
      {client && (
        <div>
          <div>
            <div>
              {photo && (
                <img
                  src={photo}
                  alt="Profile"
                  className="rounded-lg object-cover"
                />
              )}
            </div>
            <div>
              <p>
                {client.firstName} {client.lastName}
              </p>
              <p>{client.profession}</p>
              <p>{client.objective}</p>
              <p>Currently residing in {client.location}</p>
              <p>
                Reach me on {client.email} or {client.phoneNumber}.
              </p>
            </div>
          </div>
          {client.isPublic && (
            <div>
              <h5 className="font-semibold text-gray-700 mb-2">Experience:</h5>
              <ul>
                {client.experience.map((exp) => (
                  <li key={exp.id || exp.companyName}>
                    <p>
                      {exp.position} at {exp.companyName} from {exp.startDate}{" "}
                      to {exp.endDate || "Present"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Monochromatic;
