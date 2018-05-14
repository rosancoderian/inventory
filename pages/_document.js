import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
  	render () {
		return (
		<html>
        	<Head>
          		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext" />
				<link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />
				<link rel="stylesheet" href="/static/css/dashboard.css" />
				<link rel="stylesheet" href="/static/css/tabler.css" />
				<link rel="stylesheet" href="/_next/static/style.css" />
        	</Head>
			<body>
				<Main />
				<NextScript />
			</body>
      	</html>
    	)
  	}
}