function SmallBanner(props) {
	const SmallBanner = () => {
	  const bannerElements = [];
  
	  if (props.hinh) {
		for (let i = 0; i < 3; i++) {
		  if (props.hinh[i]) {
			bannerElements.push(
			  <div className="col-lg-4 col-md-6 col-12" key={i}>
				<div className="single-banner">
				  <img src={`http://localhost:8000/` + props.hinh[i].url} />
				  <div className="content">
					<a href="/discover-now">Discover Now</a>
				  </div>
				</div>
			  </div>
			);
		  }
		}
	  }
  
	  return bannerElements;
	};
  
	return (
	  <>
		<section className="small-banner section">
		  <div className="container-fluid">
			<div className="row">{SmallBanner()}</div>
		  </div>
		</section>
	  </>
	);
  }
  
  export default SmallBanner;
  