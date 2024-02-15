interface Props {
  records: any;
}

const ReviewCards = (props: Props) => {
  return (
    <div className="container text-center" style={{ paddingTop: "15px" }}>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3">
        {props.records.map((r: any) => {
          return (
            <div
              className="col"
              key={r.id}
              style={{ height: "fit-content", paddingTop: "40px" }}
            >
              <div className="card" style={{ width: "18rem", height: "300px" }}>
                <div className="card-body">
                  <h5 className="card-title">{r.author}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Rating: {r.rating}
                  </h6>
                  <p className="card-text">Title: {r.title}</p>
                  <p
                    className="card-text"
                    style={{ height: "70px", overflow: "auto" }}
                  >
                    {r.content}
                  </p>
                  <p className="card-text">Submission: {r.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewCards;
