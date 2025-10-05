module.exports = (objectPagination,req,countProducts)=>{
   //Start Pagination - Phân trang
    if (req.query.page != null && !isNaN(req.query.page)) {
        objectPagination.currentPage = parseInt(req.query.page) > 1 ?
            parseInt(req.query.page) : objectPagination.currentPage; // trang hiện tại đang truyền lên url
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    const totalPage = Math.ceil(countProducts / objectPagination.limitItems); // đếm số trang
    //ceil : làm tròn lên 
    objectPagination.totalPage = totalPage;
    // xử lý start end cho phân trang 
    if (objectPagination.currentPage == 1) {
        objectPagination.start = 1
        objectPagination.end = 3 > totalPage ? totalPage : 3
    } else if (objectPagination.currentPage == objectPagination.totalPage) {
        objectPagination.start = objectPagination.totalPage - 2 > 0 ? objectPagination.totalPage - 2 : 1
        objectPagination.end = objectPagination.totalPage
    }else{
        objectPagination.start = objectPagination.currentPage - 1
        objectPagination.end = objectPagination .currentPage + 1
    }
    return objectPagination;        
    //End Pagination
}