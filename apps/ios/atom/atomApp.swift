//
//  atomApp.swift
//  atom
//
//  Created by Horus Lugo López on 23/9/23.
//

import SwiftUI
import Peregrine

@main
struct atomApp: App {
    let frame: WebFrame

    init() {
        let baseURL = Bundle.main.url(forResource: "www", withExtension: nil)!
        let configuration = WebFrame.Configuration(baseURL: baseURL)
        frame = WebFrame(configuration: configuration)
    }

    var body: some Scene {
        WindowGroup {
            ContentView(frame: frame)
        }
    }
}
