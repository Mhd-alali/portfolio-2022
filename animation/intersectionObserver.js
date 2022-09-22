const useIntersectionObserver = ({element,threshold = 0},enterCallback,leavedCallback = ()=>{}) => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				enterCallback()
			}
			else {
				leavedCallback()
			}
		})
	}, {threshold})

	observer.observe(element)
}

export default useIntersectionObserver