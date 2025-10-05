  module.exports = (req) => {
      //tính năng tìm kiếm
      let objectSearch = {
          keyword: ""
      };
      if (req.query.keyword !=null) {
          objectSearch.keyword = req.query.keyword.trim();
          objectSearch.regex = new RegExp(objectSearch.keyword, "i"); // "i" để không phân biệt chữ hoa thường
      }
      // Nếu keyword = "iPhone", thì dòng đó tương đương với /iPhone/i.
      // MongoDB hiểu $regex (regular expression) là biểu thức tìm kiếm theo mẫu,
      //  nên nó sẽ đi quét qua mọi document trong collection products 
      //  để tìm các bản ghi có title khớp với mẫu /iPhone/i.
      return objectSearch;
  }