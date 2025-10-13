# Getting Started with Create React App

## Observação sobre timezone

Ao filtrar os dados do gráfico (nos formatos YYYY-MM-DD ou ISO), alguns registros podem aparecer no mês anterior se converter para o timezone local, por isso decidir exibir as datas em UTC para manter consistência, se fossem exibidas no timezone local o gráfico poderia mostrar registros do ultimo dia do mês anterior, por exemplo Setembro (`start_date=2025-09-01&end_date=2025-09-30` ou `start_date=2025-09-01T03:00:00.000Z&end_date=2025-10-01T02:59:59.999Z`) que retorna o registro com `ID` `cce0404e-0ffb-43d7-a099-a4bc856d1437` e `transaction_date` `2025-09-01T02:47:31.829Z`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
