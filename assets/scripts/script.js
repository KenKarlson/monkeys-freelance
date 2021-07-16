document.addEventListener('DOMContentLoaded', () =>{
  'use strict';

  const customer = document.getElementById('customer'),
      freelancer = document.getElementById('freelancer'),
      blockCustomer = document.getElementById('block-customer'),
      blockFreelancer = document.getElementById('block-freelancer'),
      blockChoice = document.getElementById('block-choice'),
      btnExit = document.getElementById('btn-exit'),
      formCustomer = document.getElementById('form-customer'),
      ordersTable = document.getElementById('orders')
      modalOrder = document.getElementById('order_read'),
      modalOrderActive = document.getElementById('order_active');

  const orders = [];

  const renderOrders = () => {
    ordersTable.textContent = '';
    orders.forEach((order, i) => {          
        ordersTable.innerHTML += `
            <tr class="order taken" data-number-order="${i}">
                <td>${i+1}</td>
                <td>${order.title}</td>
                <td class="${order.currency}"></td>
                <td>${order.deadline}</td>
            </tr>`;

      }) ;
  };

  const openModal = (numberOrder) => {
      const order = orders[numberOrders];
      const modal = !order.active ? modalOrderActive : modalOrder;
      modal.style.display = 'block';
  };

  ordersTable.addEventListener('click', (event) =>{
      const target = event.target;
      
      const targetOrder = target.closest('.order')
        if(targetOrder){
          openModal(targetOrder.dataset.numberOrder);
        }

      
  });


  customer.addEventListener('click' , () =>{
    blockChoice.style.display = 'none';
    blockCustomer.style.display = 'block';
    btnExit.style.display = 'block';
  });

  freelancer.addEventListener('click' , () =>{
    blockChoice.style.display = 'none';
    renderOrders();
    blockFreelancer.style.display = 'block';
    btnExit.style.display = 'block';
  });

  btnExit.addEventListener('click' , () =>{
    btnExit.style.display = 'none';
    blockFreelancer.style.display = 'none';
    blockCustomer.style.display = 'none';
    blockChoice.style.display = 'block';
    
  });


  formCustomer.addEventListener('submit', (e) => {
    e.preventDefault();

    const obj = {};
    
    [...formCustomer.elements].forEach((elem) => {
      
      if((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
      (elem.type === 'radio' && elem.checked) ||
      elem.tagName === 'TEXTAREA'){
        obj[elem.name] = elem.value;
        if(elem.type !== 'radio'){
            elem.value = '';
        }
      }
    });

    formCustomer.reset();

    orders.push(obj);
    
  }); 


})