import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);  //usando stados 
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigatetoDetail(incident) {   
        navigation.navigate('Detail', { incident } );  //chama a rota 'Detail' e passa o objeto incident para a rota
    }

    async function loadIncidents() {
        if (loading) { //Se está carregando no momento, faz
            return;
        }

        if (total > 0 && incidents.lenght == total) { //se total for maior que zero E o total de casos for IGUAL ao total, faz
            return;
        }

        setLoading(true); //está carregando, fazendo a requisição

        //chamada da API na rota incidents do backend
        const response = await api.get('incidents', {
            params: { page } //passa por parametro o número da page na URL da requisição da API
        });    

        //anexar dois vetores dentro de um vetor, dados anteriores + novos dados requisitados 
        setIncidents([ ... incidents, ... response.data]);    //setando os dados da resposta da chamada, formando um array com os dados anteriores dos incidents e acrescentando a resposta da requisição
        
        setTotal(response.headers['x-total-count']); //setando na variável total o valor total de casos, que está no header dA requisição
        setPage(page + 1); //soma +1 na variável de controle de paginação
        setLoading(false); // ao término da requisição seta o load como falso, já carregou
    }

    useEffect(() => {
        loadIncidents();    //chama a função loadIncidents
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
        

            <FlatList 
                data={incidents}    //setando os dados para a flatlist
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}  //chave única de cada lista
                showsVerticalScrollIndicator={false}  //tirando indicador vertical do scrool
                onEndReached={loadIncidents} //no final do scroll, chama a função
                onEndReachedThreshold={0.2} //0.1 = 10%, 0.2 = 20%;    Usuário quando estiver a 20% do final da lista para carregar novos itens
                renderItem={({ item: incident }) => (   //renderizando itens do incident
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                        
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}> 
                            {Intl.NumberFormat('pt-BR', {   //formatação para R$
                                style: 'currency', currency: 'BRL' 
                            }).format(incident.value)} 
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigatetoDetail(incident)}//passagem de parâmetros para a função
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}