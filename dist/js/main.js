// Device track
document.getElementById('device-track').value = window.navigator.userAgent;

// IP track
let user_ip;
fetch('https://api.ipify.org/?format=json')
  .then((data) => data.json())
  .then((data) => {
    user_ip = data.ip;
    document.getElementById('ip-track').value = user_ip;
  });

  


// UTM params
let utmQuery = decodeURIComponent(window.location.search.substring(1)),
  utmVariables = utmQuery.split('&'),
  ParameterName,
  i;

const getUTMValue = (inputParameter) => {
  for (i = 0; i < utmVariables.length; i++) {
    ParameterName = utmVariables[i].split('=');
    if (ParameterName[0] === inputParameter) {
      return ParameterName[1] === null ? null : ParameterName[1];
    }
  }
};

const valueExists = (value) => {
  return value != null && value != '' && value != undefined;
};

const utmParams = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

utmParams.forEach((param) => {
  var pValue = getUTMValue(param);

  if (valueExists(pValue)) {
    Cookies.set(param, pValue, {
      domain: cookieDomain,
      expires: 90,
    });
  }
  let cValue = Cookies.get(param);
  let input = document.getElementById(param);
  if (input && valueExists(cValue)) {
    input.value = cValue;
  }
});
