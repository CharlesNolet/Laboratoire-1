const { parse } = require('path');
const url = require('url');

exports.maths = function(req, res) {
  const reqUrl = url.parse(req.url, true)
  const queryString = require('query-string');
  var parameters = req.url.replace("/api/maths",'');
  const parsed = queryString.parse(parameters);

  var error = null;
  var op = parsed.op;
  var value = null;
  var error = null;
  var x;
  var y;
  var n;
  
  if(op == " " || op == "-" || op == "*" || op == "/" || op == "%")
  {
    if(parsed.x == null || parsed.x.trim() =="")
    {
      parsed.error = "Le parametre 'x' est manquant";
    }
    else if(isNaN(parsed.x))
    {
      parsed.error = "Le parametre 'x' n'est pas un nombre";
    }
    else
    {
      x = parseInt(parsed.x);
    }
    
    if(parsed.y == null || parsed.y.trim() == "")
    {
      parsed.error = "Le parametre 'y' est manquant";
    }
    else if(isNaN(parsed.y))
    {
      parsed.error = "Le parametre 'y' n'est pas un nombre";
    }
    else
    {
      y = parseInt(parsed.y);
    }

    if(parsed.error == null)
    {
      if(op == " ")
      {
        value = x + y;
      }
      else if(op == "-")
      {
        value = x - y;
      }
      else if(op == "*")
      {
        value = x * y;
      }
      else if(op == "/")
      {
        value = x / y;
      }
      else if(op == "%")
      {
        value = (y * x) / 100;
      }
    }
  }
  else if (op == "!" || op == "p" || op == "np")
  {
    if(parsed.n == null || parsed.n.trim() == "")
    {
      parsed.error = "Le parametre n est manquant";
    }
    else if(isNaN(parsed.n))
    {
      parsed.error = "Le parametre n n'est pas un nombre";
    }
    else
    {
      n = parseInt(parsed.n);
    }

    if(parsed.error == null)
    {
      if(op == "!")
      {
        value = factorial(n);
      }
      else if(op == "p")
      {
        value = isPrime(n);
      }
      else if(op == "np")
      {
        value = n + "ieme premier"
      }
    }
  }
  else
  {
    parsed.error = "L'operateur est invalide";
  }

  if(value != null)
  {
    parsed.value = value;
  }

  var response = parsed;

  res.statusCode = 200;
  res.end(JSON.stringify(response));
}

function factorial(n)
{

  var total = n;

  for(var compteur = 1; compteur < n;compteur++)
  {
    total = total * compteur;
  }

  return total;
}

function isPrime(num)
{
  for(var i = 2; i < num; i++)
  if(num % i === 0) return false;
  return num > 1;
}

exports.invalidUrl = function(req, res) {
   var response = [
     {
       "message": "Endpoint incorrect. Les options possibles sont "
     },
     availableEndpoints
   ]
   res.statusCode = 404;
   res.end(JSON.stringify(response));
}
 
const availableEndpoints = [
  {
    method: "GET",
    maths: "/api/maths"
  },
]