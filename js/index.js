/*
 * @Author: lucas Liu lantasy.io@gmail.com
 * @Date: 2024-10-21 23:10:08
 * @LastEditTime: 2024-10-22 12:06:36
 * @Description:
 */

const LOCAL_STORAGE_KEY = 'mysite:data';

let data = [];

// let data = [
//   {
//     title: 'Design album',
//     url: 'https://www.google.com/',
//   },
//   {
//     title: 'Frontend Projects',
//     url: 'https://www.google.com/',
//   },
//   {
//     title: 'Backend Projects',
//     url: 'https://www.google.com/',
//   },
//   {
//     title: 'Fullstack Projects',
//     url: 'https://www.google.com/',
//   },
//   {
//     title: 'Data Science Projects',
//     url: 'https://www.google.com/',
//   },
// ];

window.onload = () => {
  const form = document.getElementById('link-form');
  form.addEventListener('submit', submitLink);
  data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  renderLinks();
};

const renderLinks = () => {
  const newLinkTemplate = document.querySelector('#link-template');

  const linkList = document.getElementById('link-container');
  // clear out the existing links
  linkList.innerHTML = '';

  data.map((item, index) => {
    const newLink = newLinkTemplate.cloneNode(true);
    newLink.querySelector('a').href = item.url;
    newLink.querySelector('a').textContent = item.title;
    newLink.querySelector('button').dataset['id'] = index;
    newLink.style = '';
    linkList.appendChild(newLink);

    // const listItem = document.createElement('li');
    // const link = document.createElement('a');
    // link.href = item.url;
    // link.target = '_blank';
    // link.textContent = item.title;
    // listItem.appendChild(link);
    // linkList.appendChild(listItem);
  });
};

const addNewLink = () => {
  const dialog = document.getElementById('link-dialog');
  dialog.showModal();
};

const removeNode = (btn) => {
  const id = btn.getAttribute('data-id');
  data.splice(id, 1);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  renderLinks();
};

const submitLink = (e) => {
  e.preventDefault();
  const form = document.getElementById('link-form');
  const formData = new FormData(form);
  const title = formData.get('title');
  const url = formData.get('url');
  // push new data to the top of the array
  data = [{ title, url }, ...data];
  //   data.push({ title: title, url: url });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  renderLinks();

  const dialog = document.getElementById('link-dialog');
  dialog.close();
};
