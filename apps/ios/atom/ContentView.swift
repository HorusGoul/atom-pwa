//
//  ContentView.swift
//  atom
//
//  Created by Horus Lugo López on 23/9/23.
//

import SwiftUI
import Peregrine

struct ContentView: View {
    let frame: WebFrame

    
    var body: some View {
        frame.view.edgesIgnoringSafeArea(.all)
    }
}

#Preview {
    ContentView(frame: WebFrame(configuration: WebFrame.Configuration()))

}
