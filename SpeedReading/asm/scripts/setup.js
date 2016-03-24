// Copyright (C) 2014 Apple Inc. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY APPLE INC. AND ITS CONTRIBUTORS ``AS IS''
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL APPLE INC. OR ITS CONTRIBUTORS
// BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
// THE POSSIBILITY OF SUCH DAMAGE.

var path = location.protocol + "//" + location.host + location.pathname.replace(/\b(Default|index)\.html$/, "") + 'asm/';

function addAsmPlans() {
    
    var suites = [
        { name: "box2d", category: "Throughput", files: ["box2d_f32_2.js"] }
    ];

    for (var i = 0; i < suites.length; ++i) {
        var suite = suites[i];

        var code = [
            "var Module = {",
            "  print: function(x) { Module.printBuffer += x + '\\n' },",
            "  printBuffer: ''",
            "};",
            "Module.arguments = ['1'];",
            "var __time_before = Date.now();"
        ];

        for (var j = 0; j < suite.files.length; ++j) {
            code.push('importScripts("' + path + 'scripts/massive/' + suite.files[j] + '");');
        }
        code.push(
            "var __time_after = Date.now();",
            "console.log('inside', Module.printBuffer, __time_after - __time_before);",
            "self.postMessage([__time_after - __time_before]);"
        );

        JetStream.addPlan({
            name: suite.name,
            benchmarks: [{
                name: suite.name,
                category: suite.category,
            }],
            code: code.join("\n")
        });
    }
    
    /*
    suites = [
        { name: "zlib", category: "Throughput", files: ["zlib.js", "zlib-data.js"] }
    ];

    for (var i = 0; i < suites.length; ++i) {
        var suite = suites[i];

        var myBenchmarks = [{
            name: suite.name,
            unit: "ms/run",
            category: suite.category,
        }];

        var code = ['importScripts("' + path + 'scripts/octane2/base.js");'];
        for (var j = 0; j < suite.files.length; ++j) {
            code.push('importScripts("' + path + "scripts/octane2/" + suite.files[j] + '");');
        }
        code.push(
            "BenchmarkSuite.scores = [];",
            "var __suite = BenchmarkSuite.suites[0];",
            "for (var __thing = __suite.RunStep({}); __thing; __thing = __thing());",
            "self.postMessage([",
            "  BenchmarkSuite.GeometricMeanTime(__suite.results) / 1000,",
            "  BenchmarkSuite.GeometricMeanLatency(__suite.results) / 1000",
            "]);"
        );

        JetStream.addPlan({
            name: suite.name,
            benchmarks: myBenchmarks,
            code: code.join("\n")
        });
    }
    */

    /*
    for (var i = 0; i < SimplePayload.length; ++i) {
        var name = SimplePayload[i].name;
        JetStream.addPlan({
            name: name,
            benchmarks: [{
                name: name,
                category: "Throughput",
            }],
            code: [
                "var __time_before = Date.now();",
                SimplePayload[i].content,
                "var __time_after = Date.now();",
                "self.postMessage([__time_after - __time_before]);"
            ].join("\n")
        });
    }
    */
}

function addNoAsmPlans() {
    var suites = [
        { name: "box2d", category: "Throughput", files: ["box2d_f32_2-noasm.js"] }
    ];

    for (var i = 0; i < suites.length; ++i) {
        var suite = suites[i];

        var code = [
            "var Module = {",
            "  print: function(x) { Module.printBuffer += x + '\\n' },",
            "  printBuffer: ''",
            "};",
            "Module.arguments = ['1'];",
            "var __time_before = Date.now();"
        ];

        for (var j = 0; j < suite.files.length; ++j) {
            code.push('importScripts("' + path + 'scripts/massive/' + suite.files[j] + '");');
        }
        code.push(
            "var __time_after = Date.now();",
            "console.log('inside', Module.printBuffer, __time_after - __time_before);",
            "self.postMessage([__time_after - __time_before]);"
        );

        JetStream.addPlan({
            name: suite.name,
            benchmarks: [{
                name: suite.name,
                category: suite.category,
            }],
            code: code.join("\n")
        });
    }

    suites = [
        { name: "zlib", category: "Throughput", files: ["zlib.js", "zlib-data-noasm.js"] }
    ];

    for (var i = 0; i < suites.length; ++i) {
        var suite = suites[i];
        var myBenchmarks = [{
            name: suite.name,
            unit: "ms/run",
            category: suite.category,
        }];

        var code = ['importScripts("' + path + 'scripts/octane2/base.js");'];
        for (var j = 0; j < suite.files.length; ++j) {
            code.push('importScripts("' + path + 'scripts/octane2/' + suite.files[j] + '");');
        }
        code.push(
            "BenchmarkSuite.scores = [];",
            "var __suite = BenchmarkSuite.suites[0];",
            "for (var __thing = __suite.RunStep({}); __thing; __thing = __thing());",
            "self.postMessage([",
            "  BenchmarkSuite.GeometricMeanTime(__suite.results) / 1000,",
            "  BenchmarkSuite.GeometricMeanLatency(__suite.results) / 1000",
            "]);"
        );

        JetStream.addPlan({
            name: suite.name,
            benchmarks: myBenchmarks,
            code: code.join("\n")
        });
    }

    for (var i = 0; i < SimpleNoAsmPayload.length; ++i) {
        var name = SimpleNoAsmPayload[i].name;
        JetStream.addPlan({
            name: name,
            benchmarks: [{
                name: name,
                category: "Throughput",
            }],
            code: [
                "var __time_before = Date.now();",
                SimpleNoAsmPayload[i].content,
                "var __time_after = Date.now();",
                "self.postMessage([__time_after - __time_before]);"
            ].join("\n")
        });
    }
}
