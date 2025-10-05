module.exports = (req)=>{
     // vẽ ra các nút Hoạt động ,dừng hoạt động ,tất cả
    let filterStatus = [
        {
            name:"Tất cả",
            status:"",
            class:"" //active để bôi xanh nút bấm vào
        },
        {
            name:"Hoạt động",
            status:"active",
            class:""
        },
        {
            name:"Dừng hoạt động",
            status:"inactive",
            class:""
        },
    ];

    // if(req.query.status){
    //     filterStatus.forEach((item) =>{
    //         if(item.status === req.query.status){
    //             item.class = "active";
    //         }
    //         else{
    //              item.class = "";
    //         }
    //     })
    // }
    if(req.query.status){
        // lấy ra phần tử đó và gán active cho class
        filterStatus.find(item => item.status == req.query.status).class = "active";
    }
    else{
        filterStatus.find(item => item.status == "").class = "active";
        // filterStatus[0].class = "active";
    }

    return filterStatus;
}