import React from "react";
import { Pagination } from "react-bootstrap";

/**
 *
 * @param active pagina attuale
 * @param pages numero di pagine totali
 * @param onClick listener
 * @returns il rendering del PageHandler
 */
const PageHandler = ({ active, pages, onClick }) => {
	/**
	 *
	 * @returns il pagehandler
	 */
	function getPaginationItems() {
		var pageRange = 0;
		var ellipsis = "";
		var first = 0;
		var last = 0;

		if (window.innerWidth < 760) {
			pageRange = 3;
		} else {
			pageRange = 6;
		}

		if (pages < pageRange) {
			ellipsis = "NONE";
			first = 1;
			last = pages;
		} else if (active <= pageRange) {
			ellipsis = "AFTER";
			first = 1;
			last = pageRange;
		} else if (active > pages - pageRange) {
			ellipsis = "BEFORE";
			first = pages - pageRange + 1;
			last = pages;
		} else {
			ellipsis = "BOTH";
			if (pageRange === 6) {
				first = active - 2;
				last = active + 3;
			} else {
				first = active - 1;
				last = active + 1;
			}
		}
		return paginationItemsMaker(ellipsis, first, last);
	}

	/**
	 *
	 * @param {*} ellipsis la posizione dell'ellipsis
	 * @param {*} first la prima pagina da visualizzare
	 * @param {*} last l'ultima pagina da visualizzare
	 * @returns il page Handler
	 */
	function paginationItemsMaker(ellipsis, first, last) {
		var toReturn = [];
		if (ellipsis === "BEFORE" || ellipsis === "BOTH") {
			toReturn.push(<Pagination.Ellipsis />);
		}
		for (let i = first; i <= last; i++) {
			toReturn.push(
				<Pagination.Item
					active={i === active}
					onClick={() => onClick(i)}
					key={i}
					custom="true"
				>
					{i}
				</Pagination.Item>
			);
		}
		if (ellipsis === "AFTER" || ellipsis === "BOTH") {
			toReturn.push(<Pagination.Ellipsis />);
		}
		return toReturn;
	}

	return (
		<Pagination className="align-pagination">
			<Pagination.First
				disabled={active === 1}
				onClick={() => onClick(1)}
			/>
			<Pagination.Prev
				disabled={active === 1}
				onClick={() => onClick(active - 1)}
			/>

			{getPaginationItems()}

			<Pagination.Next
				disabled={active === pages}
				onClick={() => onClick(active + 1)}
			/>
			<Pagination.Last
				disabled={active === pages}
				onClick={() => onClick(pages)}
			/>
		</Pagination>
	);
};

export default PageHandler;
