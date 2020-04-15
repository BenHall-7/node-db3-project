-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

select ProductName, CategoryName from Product
join Category
on Product.CategoryId = Category.Id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

select o.Id, s.CompanyName
from 'Order' as o
where o.OrderDate < '2012-07-09'
join Shipper as s
  on o.ShipVia = s.Id

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

select p.ProductName, p.Quantity
from Product as p
join OrderDetail as od
  on od.ProductId = p.Id
where od.OrderId = 10251
order by p.ProductName asc

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

select o.Id, c.CompanyName, e.LastName
from 'Order' as o
join Customer as c
  on c.Id = o.CustomerId
join Employee as e
  on e.Id = o.EmployeeId
