var express =require("express"),
	app = express(),
	http = require("http").Server(app).listen(8080)
	upload=require("express-fileupload");
	fs =require("fs"),
	zlib =require("zlib"),
app.use(upload())
console.log("Server Started!")
app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
	if(req.files)
	{
		console.log(req.files)
		var file=req.files.filename,
			filename=file.name;

			decompress=zlib.createGunzip(),
			readstream=fs.createReadStream(filename);

			if (/.zip$/i.test(filename)==true)
			{
				var newfilename=filename.replace(".zip",""),
					writestream=fs.createWriteStream(newfilename);
					readstream.pipe(decompress).pipe(writestream);
				file.mv("/Users/mac/Desktop/"+newfilename,function(err)
				{
					if(err)
					{
						console.log(err)
						res.send("Error Occured")
					}
					else
					{
						res.send("File has uploaded successfully!")
					}
				})
			}
			else
			{
				file.mv("/Users/mac/Desktop/"+filename,function(err)
				{
					if(err)
					{
						console.log(err)
						res.send("Error Occured")
					}
					else
					{
						res.send("File has uploaded successfully!")
					}
				})
			}
	}
})
