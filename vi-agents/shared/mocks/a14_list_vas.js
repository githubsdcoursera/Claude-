// @description A14 VAS & Complaints: active value-added services with verbatim name, price and start date.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out count vas_1_id vas_1_name vas_1_price vas_2_id vas_2_name vas_2_price
const c = customer(input.msisdn);
const v = (c && c.vas) || [];
return { count: v.length, vas_1_id: v[0] ? v[0].id : "", vas_1_name: v[0] ? v[0].name : "", vas_1_price: v[0] ? v[0].price : "",
  vas_2_id: v[1] ? v[1].id : "", vas_2_name: v[1] ? v[1].name : "", vas_2_price: v[1] ? v[1].price : "" };
