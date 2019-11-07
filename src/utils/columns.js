export const getColumns = (data,index)=> {
  
  let columns = []
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      let columnsObj = {};
      columnsObj.title = element
      columnsObj.key= key;
      columnsObj.minWidth  = 115;
      columnsObj.align = "left";
      if(columnsObj.key=="development_date"||columnsObj.key=="price_update_date"){
        columnsObj.sortable=true
      }
      if(!index){
        if(columnsObj.key.indexOf("shipment")>=0){
          columnsObj.render=function(h,params){
            if(params.row[params.column.key]){
              let trendPrice = parseFloat(params.row[params.column.key].sale_price - params.row[params.column.key].old_price).toFixed(2)
              return h("Tooltip",[
                h("span",params.row[params.column.key].sale_price),
                h("div",{slot:'content'},[
                  h("p","最新价格："+params.row[params.column.key].sale_price),h("p","零利润价格："+params.row[params.column.key].no_profit_price),h("p","幅度："+trendPrice)
                ])
              ])
            }
            
          }
        }
      }else{
        if(columnsObj.key.indexOf("shipment")>=0){
          columnsObj.render=function(h,params){
            if(params.row[params.column.key]){
              let trendPrice = parseFloat(params.row[params.column.key].sale_price - params.row[params.column.key].old_price).toFixed(2)
              return h("Tooltip",[
                h("span",params.row[params.column.key].old_price+"+"+params.row[params.column.key].sale_price),
                h("div",{slot:'content'},[
                  h("p","最新价格："+params.row[params.column.key].sale_price),h("p","零利润价格："+params.row[params.column.key].no_profit_price),h("p","幅度："+trendPrice)
                ])
              ])
            }
            
          }
        }
      }
     
      columns.push(columnsObj)
    };
  }
  let operation = {
    title:"操作",
    fixed:"right",
    minWidth:90,
    render:(h,params) =>{
      return h("Icon",{
        props: {
          type: "ios-list-box",
          size: 20
        },
        style: {
          color: "#3a8ee6",
          marginLeft: "20px",
          cursor: "pointer"
        },
        on: {
          click: () => {
          }
        }
    })
    }
  }
  columns.push(operation)
  return columns
};