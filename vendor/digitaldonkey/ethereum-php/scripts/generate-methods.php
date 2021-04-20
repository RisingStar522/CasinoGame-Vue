<?php

/**
 * @file
 * Generates interface Web3Methods.
 *
 * Generating from resources/ethjs-schema.json -> objects.
 *
 * @ingroup generators
 */

require_once(__DIR__ . "/generator-commons.php");

use gossi\codegen\generator\CodeGenerator;
use gossi\codegen\model\PhpInterface;
use gossi\codegen\model\PhpTrait;
use gossi\codegen\model\PhpMethod;
use gossi\codegen\model\PhpParameter;
use Ethereum\DataType\EthD;


// For Tests we can disable the file generation.
$shouldWriteToDisc = (isset($GLOBALS['argv'][1]) && $GLOBALS['argv'][1] === '--no-file-generation') ? false : true;


/**
 * @var array $conf Set up variables for the generated scripts.
 */
$conf = [
    'interface' => [
        'destination' => './src/Web3Interface.php',
        'class' => 'PhpInterface',
        'name' => 'Web3Interface',
        'group' => "@ingroup generated\n * @ingroup interfaces"

    ],
    'trait' => [
        'destination' => './src/Web3Methods.php',
        'class' => 'PhpTrait',
        'name' => 'Web3Methods',
        'group' => '@ingroup generated'
    ]
];

foreach ($conf as $cnf) {
    echo "### GENERATING ETHEREUM METHODS INTERFACE ###\n";
    echo "# File generated " . $cnf['destination'] . "\n";

    $group = $cnf["group"];
    $file_header = <<<EOF
<?php
/**
 * @file
 * This is a file generated by scripts/generate-methods.php.
 * 
 * DO NOT EDIT THIS FILE.
 * 
 * $group
 */


EOF;

    /** @var $useStatements - array collects data types. */
    $useStatements = [];

    if ($cnf['class'] === 'PhpTrait') {
        $code = new PhpTrait();
    }
    if ($cnf['class'] === 'PhpInterface') {
        $code = new PhpInterface();
    }


    $code->setQualifiedName('\\Ethereum\\' . $cnf['name'])
        ->setDescription(array(
            'Ethereum JsonRPC Methods.',
            '',
            'Interface is generated by scripts/generate-methods.php based on resources/ethjs-schema.json.',
            'Methods are actually implemented with [method overloading](http://php.net/manual/en/language.oop5.overloading.php#object.call) using __call().',
        ))
    ;

    $schema = getSchema();

    foreach ($schema['methods'] as $method_name => $params) {

        # printMe("\n# Generate $method_name");

        // Params for this method.
        $valid_params = $params[0];
        # printMe('Valid params', $valid_params);


        // Generate parameters.
        $methodParams = [];
        if (count($valid_params)) {

            // Get argument definition Classes.
            foreach ($valid_params as $i => $type) {
                $primitiveType = EthD::typeMap($type);
                $paramType = $primitiveType ? $primitiveType : $type;
                $methodParams[] = PhpParameter::create("arg" . ($i + 1))
                    ->setType($paramType);
                // Add a use statement.
                addUseStatement("Ethereum\\DataType\\$paramType", $useStatements);
            }
        }

        // Generate Return value.
        $returnType = $params[1];
        $returnTypeDescription = '';
        if (is_array($returnType)) {
            if (EthD::typeMap($returnType[0])) {
                $arrayOfType = EthD::typeMap($returnType[0]);
            } else {
                $arrayOfType = $returnType[0];
            }
            $returnType = "array";
            $returnTypeDescription = "  Array of " . $arrayOfType;
        } else if (EthD::typeMap($returnType)) {
            $returnType = EthD::typeMap($returnType);
            addUseStatement("Ethereum\\DataType\\$returnType", $useStatements);
        }
        else {
            addUseStatement("Ethereum\\DataType\\$returnType", $useStatements);
        }

        # printMe('Return type', $returnTypeDescription ? $returnTypeDescription : $returnType);

        // Generate method.
        $code->setMethod(PhpMethod::create($method_name)
            ->setDescription(array(
                "Generated method $method_name().",
                "",
                "See [Ethereum Wiki $method_name](https://github.com/ethereum/wiki/wiki/JSON-RPC#" . strtolower($method_name) . ")",
                "",
            ))
            ->setParameters($methodParams)
            ->setType('null|' . $returnType, $returnTypeDescription)
        );
        if ($cnf['class'] === 'PhpTrait') {
            $code->getMethod($method_name)->setBody('return $this->__call(__FUNCTION__, func_get_args());');
        }

    }

    $code->setUseStatements($useStatements);
    $generator = new CodeGenerator([
        'generateScalarTypeHints' => TRUE,
        'generateReturnTypeHints' => TRUE,
        'enableSorting' => FALSE,
    ]);
    $codeText = $generator->generate($code);

    # print $codeText;
    if ($shouldWriteToDisc) {
        file_put_contents($cnf['destination'] , $file_header . $codeText);
    }
    else {
        echo "File is not written to disc, because file generation is disabled by '--no-file-generation'\n";
    }
    echo "#############################################\n";


}

