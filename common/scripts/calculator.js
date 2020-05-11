// Declare all of the variables needed
var amountDepCare;
var amountIncReplacement;
var assetsAmount;
var coverageAmount;
var debtAmount;
var dependentCareEstimate;
var durationDepCare;
var durationIncReplacement;
var educationAmount;
var finalExpenses;
var incomeReplacementEstimate;
var monthlyNominalDiscountRate;
var mortgageAmount;
var rateOfCare;
var rateOfReplacement;
var rateOfReturn;
var termOfReturn;
var maxVal;
var chartLabels='';
var chartOrder='';

$(document).ready(function() {
  
  // Hide the results screens
  $('#calc-results').css('display', 'none');
  $('#calc-results #covered').css('display', 'none');
  
  
  // Clean up all of the input fields as input is entered
  $('#insurance-calc input').blur(function() {
    if ($(this).hasClass('currency') == true || $(this).hasClass('currency-noreq') == true) {
      var newVal = $(this).val() ? parseFloat($(this).val().replace(/[^\d.-]+/g, "")) : null;
      if (newVal) {
       $(this).val(Math.round(newVal)); 
      }
    };
    
  });
  
  
  // Add 'odd' and 'even' classes to the chart rows
  $('#insurance-calc .field-row').each(function(i) {
    if (i % 2 == 0) {
     $(this).addClass('odd');
    } else {
      $(this).addClass('even');
    }
  });
  
  
  /* FORM VALIDATORS */
  $('#insurance-calc #calculatorForm').validate({
      debug: true,
      rules: {
        AmountDepCare: {
          required: "#someDependents:checked",
          number: true
        },
        DurationDepCare: {
          required: "#someDependents:checked",
          number: true
        }
      },
      submitHandler: function(form) {
        
        if (!$('#insurance-calc #EducationAmount').val()) {
          $('#insurance-calc #EducationAmount').val(0);
        }
        
        var estimate = calculateEstimate();
        
        var total1 = totalInsuranceEstimate;
        var total2 = parseFloat(assetsAmount) + parseFloat(coverageAmount);
        var total3 = parseFloat(mortgageAmount) + parseFloat(debtAmount) + parseFloat(finalExpenses) + parseFloat(Math.round(dependentCareEstimate)) + parseFloat(educationAmount);
        var total4 = Math.round(incomeReplacementEstimate);
        
        maxVal = Math.round(Math.max(total1, total2, total3, total4) * 1.1);
        chartLabels='';
        chartOrder='';
        
        var image_src = 'http://chart.apis.google.com/chart'+
                            '?chxl=0:|Required|Resources|Debt+%26+Expense|Retirement+Needs'+
                            '&chxr=1,0,'+maxVal+
                            '&chxs=0,676767,14.5,0,l,676767|1N*csUSD*,676767,12,1,lt'+
                            '&chxt=x,y'+
                            '&chbh=a'+
                            '&chs=800x300'+
                            '&cht=bvs'+
                            '&chco=F9F000,4388E2,CE400A,F39D09,057F00,666666,4843CD,C74CC8,D1AD0B'+//FFCC35,525C66,496885,0A3A6A,637275,29598A,7B6D6C,465073,074870'+
                            '&chds=0,'+maxVal+
                            '&chd=t:'+totalInsuranceEstimate+'|'+
                                    '_,'+assetsAmount+'|'+
                                    '_,'+coverageAmount+'|'+
                                    '_,_,'+mortgageAmount+'|'+
                                    '_,_,'+debtAmount+'|'+
                                    '_,_,'+finalExpenses+'|'+
                                    '_,_,'+Math.round(dependentCareEstimate)+'|'+
                                    '_,_,'+educationAmount+'|'+
                                    '_,_,_,'+Math.round(incomeReplacementEstimate)+
                            '&chg=-1,-1,0,5'+
                            '&chma=0,0,0,5'+
                            '&chm='+showLabel('Additional+Insurance', totalInsuranceEstimate, 'C74CC8', '0')+
                                  't\(\$'+addCommas(totalInsuranceEstimate, true)+'\),C74CC8,0,,12,,c:0:-15|'+
                                  showLabel('Assets', assetsAmount, 'FFFFFF', '1')+
                                  showLabel('Current+Coverage', coverageAmount, 'FFFFFF', '2')+
                                  showLabel('Mortgage', mortgageAmount, 'FFFFFF', '3')+
                                  showLabel('Other+Debt', debtAmount, 'FFFFFF', '4')+
                                  showLabel('Final+Expense', finalExpenses, 'FFFFFF', '5')+
                                  showLabel('Dependent+Care', Math.round(dependentCareEstimate), 'FFFFFF', '6')+
                                  showLabel('Education', educationAmount, 'FFFFFF', '7')+
                                  showLabel('Income', Math.round(incomeReplacementEstimate), 'FFFFFF', '8')+
                            '&chdl='+chartLabels.substring(0, chartLabels.length - 1)+
                            '&chdlp=r|0,2,1,7,6,5,4,3,8';

        $('#calc-results #visualization').html('<img src="' + image_src + '"/>');
        
        if (estimate > 0) {
          $('#calc-results #insurance_estimate_wrap').css('display', 'block');
          $('#calc-results #visualization').css('display', 'block');
          $('#calc-results #covered').css('display', 'none');  
        }
        else
        {
          $('#calc-results #insurance_estimate_wrap').css('display', 'none');
          $('#calc-results #visualization').css('display', 'none');
          $('#calc-results #covered').css('display', 'block');
        }
        
        api.load();
        
        return false;        
      },
      errorPlacement: function(error, element) {
        element.parent().after(error);
      }
  });
  
  $.validator.addClassRules('currency', {
    required: true,
    number: true
  });
  
  $.validator.addClassRules('number', {
    required: true,
    number: true
  });
  /* END FORM VALIDATORS */
  
  
 // Create the Results overlay
 var api = $('#calc-results').overlay({
   	expose: {
   		color: '#000',
   		loadSpeed: 200,
   		opacity: 0.7,
		maskId: 'overlayMask'
   	},
   	closeOnClick: true,
    onLoad: function() { $('#calc-results').insertAfter('#overlayMask'); $('#calc-results').css('display', 'block')},
   	api: true
 });
  
  
  // Add Dependency to the Radio buttons
  $('#insurance-calc #DependentRadio input:radio').click(function() {
    if ($(this).val() == 1)
    {
      $('#insurance-calc #DependentFields').removeClass('disabled');
      $('#insurance-calc #DependentFields input').removeAttr('disabled');
      $('#insurance-calc #DependentFields').show(500);
    } else {
      $('#insurance-calc #DependentFields').addClass('disabled');
      $('#insurance-calc #DependentFields input').attr('disabled', 'disabled');
      $('#insurance-calc #DependentFields input').valid();
      $('#insurance-calc #DependentFields').hide(500);
    }
  });
  
  
  // Do the actual calculations (created from original KOC code)
  function calculateEstimate() {
  	amountDepCare = parseFloat($('#insurance-calc #AmountDepCare').val());
  	amountIncReplacement = parseFloat($('#insurance-calc #AmountIncReplacement').val());
  	assetsAmount = parseFloat($('#insurance-calc #AssetsAmount').val());
  	coverageAmount = parseFloat($('#insurance-calc #CoverageAmount').val());
  	debtAmount = parseFloat($('#insurance-calc #DebtAmount').val());
  	durationDepCare = parseFloat($('#insurance-calc #DurationDepCare').val());
  	durationIncReplacement = parseFloat(0+$('#insurance-calc #DurationIncReplacement').val());
  	educationAmount = parseFloat($('#insurance-calc #EducationAmount').val());
  	finalExpenses = parseFloat($('#insurance-calc #FinalExpenses').val());
  	mortgageAmount = parseFloat($('#insurance-calc #MortgageAmount').val());
  	rateOfReturn = parseFloat($('#insurance-calc #RateOfReturn').val());
  	totalInsuranceEstimate = debtAmount + mortgageAmount + finalExpenses + educationAmount - assetsAmount - coverageAmount;

  	rateOfReturn = rateOfReturn/100;
  	termOfReturn = (rateOfReturn/(1+rateOfReturn)).toPrecision(12);
  	monthlyNominalDiscountRate = (12*(1-Math.pow(1-termOfReturn, 1/12))).toFixed(13);

  	if ($('#insurance-calc #DependentRadio input:checked').val() == 1)
  	{
  	  // calculate the dependent care estimate
  	  if(rateOfReturn==0) {rateOfCare = 12 * durationDepCare;}
  	  else {rateOfCare = 12 * ((1-Math.pow(1/(1+rateOfReturn), durationDepCare))/monthlyNominalDiscountRate);}
  	  dependentCareEstimate = rateOfCare * amountDepCare;
    } else {
      dependentCareEstimate = 0;
    }
    
  	// calculate the income replacement estimate
  	if(rateOfReturn==0) {rateOfReplacement = 12 * durationIncReplacement;}
  	else {rateOfReplacement = 12 * ((1-Math.pow(1/(1+rateOfReturn), durationIncReplacement))/monthlyNominalDiscountRate);}

  	incomeReplacementEstimate = (rateOfReplacement * amountIncReplacement).toFixed(6);

  	// calculate the total insurance estimate
  	totalInsuranceEstimate = Math.round(totalInsuranceEstimate + (+dependentCareEstimate) + (+incomeReplacementEstimate));
    
    if (totalInsuranceEstimate > 0) {
      $('#calc-results #insurance_estimate').text(addCommas(totalInsuranceEstimate));
    }
    else
    {
      $('#calc-results #insurance_estimate_wrap').css('display', 'none');
      $('#calc-results #visualization').css('display', 'none');
      $('#calc-results #covered').css('display', 'block');
    }
    
  	return(totalInsuranceEstimate);
  }
  
});

function showLabel(label, value, color, index) {
  var returnVal = '';

  if ((parseFloat(value) / maxVal) > 0.06) 
  {
    returnVal = 't'+label+','+color+','+index+',,12,,c';
    if (label != "Income")
    {
      returnVal = returnVal + '|';
    }
  }
  else if (label == "Income")
  {
    returnVal = 't,'+color+','+index+',,12,,c';
  }
  
  chartLabels = chartLabels+label+'|';
  chartOrder = chartOrder.length == 0 ? index : chartOrder + ','+index;
  return returnVal;
}

function addCommas(nStr, escape)
{
  escape = escape ? true : false;
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
	  if (escape)
	  {
		  x1 = x1.replace(rgx, '$1' + '\\,' + '$2');
		}
		else
		{
		  x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
	}
	return x1 + x2;
}