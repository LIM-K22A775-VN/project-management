module.exports = (req)=>{
     // vẽ ra các nút Hoạt động ,dừng hoạt động ,tất cả
    let filterSort = [
        {

            name:"Vị trí giảm dần",
            sortKey:"position",
            sortValue:"desc",
            class:"" //active để bôi xanh nút bấm vào
        },
        {
            name:"Vị trí tăng dần",
            sortKey:"position",
            sortValue:"asc",
            class:""
        },
        {
            name:"Giá giảm dần",
            sortKey:"price",
            sortValue:"desc",
            class:""
        },
        {
            name:"Giá tăng dần",
            sortKey:"price",
            sortValue:"asc",
            class:""
        },
        {
            name:"Tiêu đề A - Z",
            sortKey:"title",
            sortValue:"asc",
            class:""
        },
        {
            name:"Tiêu đề Z - A",
            sortKey:"title",
            sortValue:"desc",
            class:""
        },
    ];
    return filterSort;
}